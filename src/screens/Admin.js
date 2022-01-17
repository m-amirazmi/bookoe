import { useEffect, useState } from "react";
import { db, storage } from "../utils/firebase.js";
import { query, getDocs, collection, addDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function Admin() {
	const [showModal, setShowModal] = useState("");
	const [showBookModal, setShowBookModal] = useState({});
	const [showBook, setShowBook] = useState(false);
	const [authors, setAuthors] = useState([]);
	const [genres, setGenres] = useState([]);
	const [categories, setCategories] = useState([]);
	const [publications, setPublications] = useState([]);
	const [books, setBooks] = useState([]);
	const [input, setInput] = useState({});
	const [offersNo, setOffersNo] = useState({});
	const [btnLoading, setBtnLoading] = useState(false);

	useEffect(() => {
		fetchAll();
	}, []);

	useEffect(() => {
		offers();
		calculateBooks(authors, setAuthors, books, "author");
		calculateBooks(genres, setGenres, books, "genres");
		calculateBooks(categories, setCategories, books, "category");
		calculateBooks(publications, setPublications, books, "publication");
	}, [books]);

	const fetchAll = () => {
		fetchData("authors", setAuthors);
		fetchData("categories", setCategories);
		fetchData("genres", setGenres);
		fetchData("publications", setPublications);
		fetchData("books", setBooks, true);
	};

	const fetchData = async (data, setState, bypass) => {
		const q = query(collection(db, data));
		const querySnapshot = await getDocs(q);
		const items = [];
		querySnapshot.forEach((doc) => {
			const item = {
				id: doc.id,
				...doc.data(),
			};
			items.push(item);
		});
		if (!bypass) {
			if (items.length > 0) setShowBook(true);
			if (items.length === 0) setShowBook(false);
		}
		setState(items);
	};

	const offers = () => {
		const isSpecial = books.filter((b) => b.is_special).length;
		const isRecommended = books.filter((b) => b.is_recommend).length;
		const isPopular = books.filter((b) => b.is_popular).length;
		const isBestSelling = books.filter((b) => b.is_bestselling).length;
		const isFlashSale = books.filter((b) => b.is_flashsale).length;
		const isOnSale = books.filter((b) => b.is_onsale).length;
		const isFeatured = books.filter((b) => b.is_featured).length;
		setOffersNo({ isSpecial, isRecommended, isPopular, isBestSelling, isFlashSale, isOnSale, isFeatured });
	};

	const calculateBooks = (state, setState, allBooks, item) => {
		const copy = [...state];
		const newItems = [];
		if (item === "genres") {
			copy.forEach((c) => {
				const total = allBooks.filter((b) => b.genres.find((g) => g === c.id)).length;
				const newItem = { ...c, total_book: total };
				newItems.push(newItem);
			});
			setState(newItems);
		} else {
			copy.forEach((a) => {
				const total = allBooks.filter((b) => b[item] === a.id).length;
				const newItem = { ...a, total_book: total };
				newItems.push(newItem);
			});
			setState(newItems);
		}
	};

	const handleInput = ({ currentTarget }) => {
		if (showModal !== "books") {
			setInput({ ...input, [currentTarget.name]: currentTarget.value });
		} else {
			const newInput = { ...input };
			if (currentTarget.files) {
				const uploadedImage = currentTarget.files[0];
				const image = {
					url: URL.createObjectURL(uploadedImage),
					name: uploadedImage.name,
					type: uploadedImage.type,
					size: uploadedImage.size,
					file: uploadedImage,
				};
				newInput.image = image;
			} else if (currentTarget.multiple) {
				const selectedGenres = [];
				const options = currentTarget.options;
				for (let i = 0, l = options.length; i < l; i++) {
					if (options[i].selected) {
						selectedGenres.push(options[i].value);
					}
				}
				newInput[currentTarget.name] = selectedGenres;
			} else if (currentTarget.type === "checkbox") {
				newInput[currentTarget.name] = currentTarget.checked;
			} else {
				newInput[currentTarget.name] = currentTarget.value;
			}
			setInput(newInput);
		}
	};

	const handleSubmit = async (e) => {
		setBtnLoading(true);
		e.preventDefault();
		if (showModal !== "books") {
			await addDoc(collection(db, showModal), { ...input, timestamp_added: serverTimestamp() });
			fetchAll();
			setInput({ name: "" });
			setShowModal("");
		} else {
			handleUpload();
		}
		setBtnLoading(false);
	};

	const handleUpload = async () => {
		const booksRef = ref(storage, `books/${input.image.name}`);
		const data = { ...input };

		const snapshot = await uploadBytes(booksRef, input.image.file);
		const pathReference = ref(storage, snapshot.metadata.fullPath);
		const imageUrl = await getDownloadURL(pathReference);
		data.image = imageUrl;

		await addDoc(collection(db, showModal), { ...data, timestamp_added: serverTimestamp() });
		fetchAll();
		setInput({ name: "" });
		setShowModal("");
	};

	const renderModal = () => {
		if (showModal && showModal !== "books") {
			return (
				<div className="bg-light p-3">
					<h3 className="text-capitalize d-flex align-items-center">
						<span>{showModal} Input</span>
						<span className="ms-auto" style={{ cursor: "pointer" }} onClick={() => setShowModal("")}>
							<i className="bi bi-x-circle"></i>
						</span>
					</h3>
					<form onSubmit={handleSubmit}>
						<label className="form-label">Name:</label>
						<input type="text" className="form-control" name="name" onChange={handleInput} value={input.name} />
						<div className="d-flex">
							{!btnLoading && <button className="ms-auto mt-3 btn btn-primary">Save</button>}
							{btnLoading && (
								<button disabled className="ms-auto mt-3 btn btn-primary">
									Loading...
								</button>
							)}
						</div>
					</form>
				</div>
			);
		} else {
			return (
				<div className="bg-light p-3">
					<h3 className="text-capitalize d-flex align-items-center">
						<span>{showModal} Input</span>
						<span className="ms-auto" style={{ cursor: "pointer" }} onClick={() => setShowModal("")}>
							<i className="bi bi-x-circle"></i>
						</span>
					</h3>
					<form className="row" onSubmit={handleSubmit}>
						<div className="col-md-6">
							<div className="mb-3">
								<label className="form-label">Book Cover:</label>
								<input type="file" className="form-control" onChange={handleInput} />
								{input.image && (
									<>
										<div className="mt-3 text-center">
											<img src={input.image.url} alt="book_cover" style={{ width: "120px" }} />
										</div>
										<div className="text-center mt-3" style={{ fontSize: "0.8rem" }}>
											Filename: {input.image.name}
										</div>
										<div className="text-center" style={{ fontSize: "0.8rem" }}>
											Size: {input.image.size / 1000} kilobytes
										</div>
									</>
								)}
							</div>
							<div className="mb-3">
								<label className="form-label">Title:</label>
								<input type="text" className="form-control" name="title" value={input.title} onChange={handleInput} />
							</div>
							<div className="mb-3">
								<label className="form-label">Author:</label>
								<select className="form-select text-capitalize" name="author" value={input.author} onChange={handleInput}>
									<option selected disabled>
										--- SELECT AUTHOR ---
									</option>
									{authors.map((author) => (
										<option key={author.id} value={author.id}>
											{author.name}
										</option>
									))}
								</select>
							</div>
							<div className="mb-3">
								<label className="form-label">Genres:</label>
								<select className="form-select" multiple name="genres" onChange={handleInput}>
									<option disabled>--- SELECT GENRES ---</option>
									{genres.map((genre) => (
										<option key={genre.id} value={genre.id} className="text-capitalize">
											{genre.name}
										</option>
									))}
								</select>
							</div>
						</div>
						<div className="col-md-6">
							<div className="mb-3">
								<label className="form-label">Category:</label>
								<select className="form-select text-capitalize" name="category" value={input.category} onChange={handleInput}>
									<option selected disabled>
										--- SELECT CATEGORY ---
									</option>
									{categories.map((c) => (
										<option key={c.id} value={c.id}>
											{c.name}
										</option>
									))}
								</select>
							</div>
							<div className="mb-3">
								<label className="form-label">Publication:</label>
								<select className="form-select text-capitalize" name="publication" value={input.publication} onChange={handleInput}>
									<option selected disabled>
										--- SELECT PUBLICATION ---
									</option>
									{publications.map((pub) => (
										<option key={pub.id} value={pub.id}>
											{pub.name}
										</option>
									))}
								</select>
							</div>
							<div className="mb-3">
								<label htmlFor="synopsis" className="form-label">
									Synopsis
								</label>
								<textarea className="form-control" id="synopsis" rows="3" name="synopsis" onChange={handleInput}>
									{input.synopsis}
								</textarea>
							</div>
							<div className="mb-3">
								<label className="form-label">Price (RM):</label>
								<input type="number" className="form-control" name="price" step="0.01" onChange={handleInput} />
							</div>
							<div className="form-check">
								<input className="form-check-input" type="checkbox" value="1" name="is_special" onChange={handleInput} />
								<label className="form-check-label" htmlFor="is_special">
									Special Offer?
								</label>
							</div>
							<div className="form-check">
								<input className="form-check-input" type="checkbox" value="1" name="is_recommend" onChange={handleInput} />
								<label className="form-check-label" htmlFor="is_recommend">
									Recommended?
								</label>
							</div>
							<div className="form-check">
								<input className="form-check-input" type="checkbox" value="1" name="is_popular" onChange={handleInput} />
								<label className="form-check-label" htmlFor="is_popular">
									Popular?
								</label>
							</div>
							<div className="form-check">
								<input className="form-check-input" type="checkbox" value="1" name="is_bestselling" onChange={handleInput} />
								<label className="form-check-label" htmlFor="is_bestselling">
									Best Selling?
								</label>
							</div>
							<div className="form-check">
								<input className="form-check-input" type="checkbox" value="1" name="is_flashsale" onChange={handleInput} />
								<label className="form-check-label" htmlFor="is_flashsale">
									Flash Sale?
								</label>
							</div>
							<div className="form-check">
								<input className="form-check-input" type="checkbox" value="1" name="is_onsale" onChange={handleInput} />
								<label className="form-check-label" htmlFor="is_onsale">
									On Sale?
								</label>
							</div>
							<div className="form-check">
								<input className="form-check-input" type="checkbox" value="1" name="is_featured" onChange={handleInput} />
								<label className="form-check-label" htmlFor="is_featured">
									Featured?
								</label>
							</div>
						</div>
						<div className="d-flex">
							{!btnLoading && <button className="ms-auto mt-3 btn btn-primary">Save</button>}
							{btnLoading && (
								<button disabled className="ms-auto mt-3 btn btn-primary">
									Loading...
								</button>
							)}
						</div>
					</form>
				</div>
			);
		}
	};

	const renderContent = (content, plural) => {
		let data;
		if (content === "author") data = authors;
		if (content === "genre") data = genres;
		if (content === "category") data = categories;
		if (content === "publication") data = publications;
		if (content === "book") data = books;

		return (
			<div className="col-md-4 mb-3">
				<div className="border" style={{ height: "100%" }}>
					{content !== "analytics" ? (
						<div className="">
							<button disabled={content !== "book"} className="btn btn-outline-primary m-3 text-capitalize" onClick={() => setShowModal(plural)}>
								Add {content}
							</button>
							<div className="ms-auto px-3 text-grey-1">
								{data.length} {data.length === 0 && content}
								{data.length > 0 && plural}
							</div>
						</div>
					) : (
						<div className="p-3">
							<h4>Analytics</h4>
						</div>
					)}
					<ul className="list-group mb-3">
						{content !== "analytics" ? (
							data.map((item) => (
								<li key={item.id} className="d-flex list-group-item border-0 text-capitalize">
									<span>{item.name || item.title}</span>
									<span className="ms-auto text-grey-1">{item.total_book}</span>
									{content === "book" && (
										<span className="ms-auto" style={{ cursor: "pointer", fontSize: "1.2rem" }} onClick={() => setShowBookModal(item)}>
											<i className="bi bi-three-dots"></i>
										</span>
									)}
								</li>
							))
						) : (
							<>
								<li className="d-flex list-group-item border-0 text-capitalize">
									<span>Special Offers</span>
									<span className="ms-auto text-grey-1">{offersNo.isSpecial}</span>
								</li>
								<li className="d-flex list-group-item border-0 text-capitalize">
									<span>Best Selling</span>
									<span className="ms-auto text-grey-1">{offersNo.isBestSelling}</span>
								</li>
								<li className="d-flex list-group-item border-0 text-capitalize">
									<span>Featured</span>
									<span className="ms-auto text-grey-1">{offersNo.isFeatured}</span>
								</li>
								<li className="d-flex list-group-item border-0 text-capitalize">
									<span>Flash Sale</span>
									<span className="ms-auto text-grey-1">{offersNo.isFlashSale}</span>
								</li>
								<li className="d-flex list-group-item border-0 text-capitalize">
									<span>On Sale</span>
									<span className="ms-auto text-grey-1">{offersNo.isOnSale}</span>
								</li>
								<li className="d-flex list-group-item border-0 text-capitalize">
									<span>Popular</span>
									<span className="ms-auto text-grey-1">{offersNo.isPopular}</span>
								</li>
								<li className="d-flex list-group-item border-0 text-capitalize">
									<span>Recommended</span>
									<span className="ms-auto text-grey-1">{offersNo.isRecommended}</span>
								</li>
							</>
						)}
					</ul>
				</div>
			</div>
		);
	};

	const renderBookModal = () => {
		const book = showBookModal;
		const findAuthor = authors.find((a) => a.id === book.author);
		const findCategory = categories.find((c) => c.id === book.category);
		const findPublication = publications.find((p) => p.id === book.publication);
		const findGenres = [];
		book.genres.forEach((g) => {
			const findGenre = genres.find((g2) => g2.id === g);
			findGenres.push(findGenre);
		});
		return (
			<div className="bg-light p-3">
				<h3 className="text-capitalize d-flex align-items-center">
					<span>{book.title}</span>
					<span className="ms-auto" style={{ cursor: "pointer" }} onClick={() => setShowBookModal({})}>
						<i className="bi bi-x-circle"></i>
					</span>
				</h3>
				<div className="row">
					<div className="col-sm-3 mb-3">
						<img src={book.image} alt={book.title} style={{ width: "100%" }} />
					</div>
					<div className="col-sm-9 text-capitalize">
						<p className="mb-2">
							<span>Author: </span>
							<span>{findAuthor.name}</span>
						</p>
						<p className="mb-2">
							<span>Category: </span>
							<span>{findCategory.name}</span>
						</p>
						<p className="mb-2">
							<span>Publication: </span>
							<span>{findPublication.name}</span>
						</p>
						<p className="mb-2">
							<span>Genres: </span>
							<span>
								{findGenres.map((g) => (
									<span className="py-1 px-3 bg-primary rounded text-white me-2">{g.name}</span>
								))}
							</span>
						</p>
						<p className="mb-2">
							<span>Price: </span>
							<span>RM {parseFloat(book.price).toFixed(2)}</span>
						</p>
						<div className="d-flex flex-wrap">
							{book.is_special && <small className="mb-2 me-1 bg-secondary text-white py-1 px-3 rounded">Special Offer</small>}
							{book.is_recommended && <small className="mb-2 me-1 bg-secondary text-white py-1 px-3 rounded">Recommended</small>}
							{book.is_popular && <small className="mb-2 me-1 bg-secondary text-white py-1 px-3 rounded">Popular</small>}
							{book.is_bestselling && <small className="mb-2 me-1 bg-secondary text-white py-1 px-3 rounded">Best Selling</small>}
							{book.is_flashsale && <small className="mb-2 me-1 bg-secondary text-white py-1 px-3 rounded">Flash Sale</small>}
							{book.is_onsale && <small className="mb-2 me-1 bg-secondary text-white py-1 px-3 rounded">On Sale</small>}
							{book.is_featured && <small className="mb-2 me-1 bg-secondary text-white py-1 px-3 rounded">Featured</small>}
						</div>
						<p className="mb-0">Synopsis (short):</p>
						<small>{book.synopsis?.substr(0, 300)}...</small>
					</div>
				</div>
			</div>
		);
	};

	return (
		<>
			<div className="container">
				<div className="py-5">
					<div className="row">
						{renderContent("analytics")}
						{renderContent("author", "authors")}
						{renderContent("genre", "genres")}
						{renderContent("category", "categories")}
						{renderContent("publication", "publications")}
						{showBook && renderContent("book", "books")}
					</div>
				</div>
			</div>
			{showModal && (
				<div style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)", height: "100%" }}>
					<div
						style={{
							zIndex: "100",
							position: "absolute",
							top: "50%",
							left: "50%",
							transform: "translate(-50%, -50%)",
							maxWidth: "94vw",
							maxHeight: "90vh",
							width: "600px",
							overflowY: "scroll",
						}}
					>
						<div>{renderModal()}</div>
					</div>
					<div
						style={{
							zIndex: "10",
							position: "absolute",
							top: "50%",
							left: "50%",
							transform: "translate(-50%, -50%)",
							backgroundColor: "rgba(0,0,0,0.5)",
							width: "100vw",
							minHeight: "100vh",
						}}
					></div>
				</div>
			)}
			{showBookModal.id && (
				<div style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)", height: "100%" }}>
					<div
						style={{
							zIndex: "100",
							position: "absolute",
							top: "50%",
							left: "50%",
							transform: "translate(-50%, -50%)",
							maxWidth: "94vw",
							maxHeight: "90vh",
							width: "600px",
							overflowY: "scroll",
						}}
					>
						<div>{renderBookModal()}</div>
					</div>
					<div
						style={{
							zIndex: "10",
							position: "absolute",
							top: "50%",
							left: "50%",
							transform: "translate(-50%, -50%)",
							backgroundColor: "rgba(0,0,0,0.5)",
							width: "100vw",
							minHeight: "100vh",
						}}
					></div>
				</div>
			)}
		</>
	);
}
