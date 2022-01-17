import { useState } from "react";
import HeroBanner from "../components/Home/HeroBanner";
import HeroBestSelling from "../components/Home/HeroBestSelling";
import MainLayout from "../layouts/MainLayout";
import { books } from "../db/books";

const promisesData = [
	{
		id: 1,
		icon: require("../assets/images/quickdelivery.svg").default,
		title: "Quick Delivery",
		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
	},
	{
		id: 2,
		icon: require("../assets/images/securepayment.svg").default,
		title: "Secure Payment",
		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
	},
	{
		id: 3,
		icon: require("../assets/images/bestquality.svg").default,
		title: "Best Quality",
		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
	},
	{
		id: 4,
		icon: require("../assets/images/return.svg").default,
		title: "Return Guarantee",
		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
	},
];

const recommendedData = [
	{
		id: 1,
		image: require("../assets/images/books/365 Days of Self Love.png").default,
	},
	{
		id: 2,
		image: require("../assets/images/books/About Last Night.png").default,
	},
	{
		id: 3,
		image: require("../assets/images/books/Breaking The Oath At Turner Creek.png").default,
	},
	{
		id: 4,
		image: require("../assets/images/books/Bullet Journaling.png").default,
	},
	{
		id: 5,
		image: require("../assets/images/books/How to Manage Your Energy.png").default,
	},
	{
		id: 6,
		image: require("../assets/images/books/Living With 50 Things.png").default,
	},
	{
		id: 7,
		image: require("../assets/images/books/The Hypocrite World.png").default,
	},
	{
		id: 8,
		image: require("../assets/images/books/The Walk to Freedom.png").default,
	},
];

const popularData = [
	{
		id: 5,
		image: require("../assets/images/books/How to Manage Your Energy.png").default,
	},
	{
		id: 7,
		image: require("../assets/images/books/The Hypocrite World.png").default,
	},
	{
		id: 6,
		image: require("../assets/images/books/Living With 50 Things.png").default,
	},
	{
		id: 8,
		image: require("../assets/images/books/The Walk to Freedom.png").default,
	},
	{
		id: 1,
		image: require("../assets/images/books/365 Days of Self Love.png").default,
	},
	{
		id: 3,
		image: require("../assets/images/books/Breaking The Oath At Turner Creek.png").default,
	},
	{
		id: 2,
		image: require("../assets/images/books/About Last Night.png").default,
	},
	{
		id: 4,
		image: require("../assets/images/books/Bullet Journaling.png").default,
	},
];

const specialOffersData = [
	{
		id: 5,
		image: require("../assets/images/home-special/about_last_night.png").default,
		title: "About Last Night",
		tags: ["adventure", "romantic", "young adult"],
		author: "Henry Fielding",
		price: "87.90",
		discounted_price: "53.90",
		synopsis:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris ",
	},
	{
		id: 7,
		image: require("../assets/images/home-special/breaking.png").default,
		title: "Breaking",
		tags: ["adventure", "mystery", "horror"],
		author: "Jane Austen",
		price: "46.90",
		discounted_price: "23.90",
		synopsis:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris ",
	},
	{
		id: 8,
		image: require("../assets/images/home-special/hypocrite_world.png").default,
		title: "Hypocrite World",
		tags: ["drama", "science fiction", "action"],
		author: "Stendhal",
		price: "97.90",
		discounted_price: "83.90",
		synopsis:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris ",
	},
	{
		id: 3,
		image: require("../assets/images/home-special/sound_of_waves.png").default,
		title: "Sound of Waves",
		tags: ["mystery", "romantic", "drama"],
		author: "Honoré De Balzac",
		price: "87.90",
		discounted_price: "53.90",
		synopsis:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris ",
	},
	{
		id: 2,
		image: require("../assets/images/home-special/the_adventure_of_lily.png").default,
		title: "The Adventure of Lily",
		tags: ["adventure", "romantic", "young adult"],
		author: "Charles Dickens",
		price: "87.90",
		discounted_price: "53.90",
		synopsis:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris ",
	},
	{
		id: 4,
		image: require("../assets/images/home-special/walk_to_freedom.png").default,
		title: "Walk to Freedom",
		tags: ["adventure", "romantic", "young adult"],
		author: "Charles Dickens",
		price: "87.90",
		discounted_price: "53.90",
		synopsis:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris ",
	},
];

export default function Home() {
	const [recommendNo, setRecommendNo] = useState(0);
	const [popularNo, setPopularNo] = useState(0);
	const [specialNo, setSpecialNo] = useState(0);

	const booksToDisplayNo = 4;

	const countRecommend = () => {
		let currentNo = recommendNo;
		currentNo++;
		if (currentNo > recommendedData.length / booksToDisplayNo - 1) return setRecommendNo(0);
		setRecommendNo(currentNo);
	};

	const countPopular = () => {
		let currentNo = popularNo;
		currentNo++;
		if (currentNo > recommendedData.length / booksToDisplayNo - 1) return setPopularNo(0);
		setPopularNo(currentNo);
	};

	const countSpecialUp = () => {
		const booksToDisplaySpecialNo = 3;

		let currentNo = specialNo;
		currentNo++;
		if (currentNo > recommendedData.length / booksToDisplaySpecialNo - 1) return setSpecialNo(0);
		setSpecialNo(currentNo);
	};

	const countSpecialDown = () => {
		const content = [];
		const booksToDisplaySpecialNo = 3;

		for (let i = 0; i < specialOffersData.length / booksToDisplaySpecialNo; i++) {
			const copyBooks = [...specialOffersData];
			const booksToDisplay = copyBooks.splice(booksToDisplaySpecialNo * i, booksToDisplaySpecialNo);
			content.push(booksToDisplay);
		}

		let currentNo = specialNo;
		currentNo--;
		if (currentNo < 0) return setSpecialNo(content.length - 1);
		setSpecialNo(currentNo);
	};

	const renderPromises = () => {
		return promisesData.map((item) => (
			<div className="col-md-3" key={item.id}>
				<div className="d-flex gap-3 align-items-center">
					<img src={item.icon} alt={item.title} />
					<div>
						<h6 style={{ fontWeight: "600" }}>{item.title}</h6>
						<p className="mb-0 text-grey-1" style={{ fontSize: "12px" }}>
							{item.description}
						</p>
					</div>
				</div>
			</div>
		));
	};

	const renderRecommended = () => {
		const content = [];

		for (let i = 0; i < recommendedData.length / booksToDisplayNo; i++) {
			const copyBooks = [...recommendedData];
			const booksToDisplay = copyBooks.splice(booksToDisplayNo * i, booksToDisplayNo);
			content.push(booksToDisplay);
		}

		return (
			<div className="col-md-6">
				<div style={{ position: "relative", height: "380px", width: "100%", backgroundColor: "#FFF6EF", borderRadius: "14px" }}>
					<div style={{ position: "relative", height: "100%" }}>
						<img
							src={require("../assets/images/home-recommended/recommend-circle-2.svg").default}
							alt="circle2"
							style={{ position: "absolute", top: "0px", right: "0px", borderTopRightRadius: "14px" }}
						/>
						<img
							src={require("../assets/images/home-recommended/dots-3.svg").default}
							alt="dots3"
							style={{ position: "absolute", top: "0px", right: "0px", transform: "translate(-90%, 300%)" }}
						/>
						<img
							src={require("../assets/images/home-recommended/recommend-circle-1.svg").default}
							alt="circle1"
							style={{ position: "absolute", bottom: "0px", left: "0px", borderBottomLeftRadius: "14px" }}
						/>
					</div>
					<div className="p-5" style={{ position: "absolute", top: "0px" }}>
						<h3 className="mb-3">Recommended For You</h3>
						<p style={{ width: "460px", fontSize: "14px" }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
					</div>
					<div className="d-flex gap-4" style={{ position: "absolute", top: "66%", left: "50%", transform: "translate(-50%, -50%)" }}>
						{content.map((item, i) => {
							if (i === recommendNo)
								return item.map((data) => (
									<img key={data.id} src={data.image} alt={data.id} style={{ height: "180px", width: "120px", borderRadius: "14px", border: "2px white solid", cursor: "pointer" }} />
								));
							return null;
						})}
					</div>
					<div
						className="d-flex shadow align-items-center justify-content-center rounded-circle"
						style={{ position: "absolute", top: "60%", right: "4%", zIndex: "10", height: "40px", width: "40px", background: "rgba(255,255,255,1)", cursor: "pointer" }}
						onClick={countRecommend}
					>
						<i className="bi bi-chevron-right" style={{ fontSize: "24px" }}></i>
					</div>
				</div>
			</div>
		);
	};

	const renderPopular = () => {
		const content = [];

		for (let i = 0; i < popularData.length / booksToDisplayNo; i++) {
			const copyBooks = [...popularData];
			const booksToDisplay = copyBooks.splice(booksToDisplayNo * i, booksToDisplayNo);
			content.push(booksToDisplay);
		}

		return (
			<div className="col-md-6">
				<div style={{ position: "relative", height: "380px", width: "100%", backgroundColor: "#E6F1FC", borderRadius: "14px" }}>
					<div style={{ position: "relative", height: "100%" }}>
						<img
							src={require("../assets/images/home-popular/circle-2.svg").default}
							alt="circle2"
							style={{ position: "absolute", top: "0px", right: "0px", borderTopRightRadius: "14px" }}
						/>
						<img
							src={require("../assets/images/home-popular/dots-4.svg").default}
							alt="dots3"
							style={{ position: "absolute", top: "0px", right: "0px", transform: "translate(-90%, 460%)" }}
						/>
						<img
							src={require("../assets/images/home-popular/circle-1.svg").default}
							alt="circle1"
							style={{ position: "absolute", bottom: "0px", left: "0px", borderBottomLeftRadius: "14px" }}
						/>
					</div>
					<div className="p-5" style={{ position: "absolute", top: "0px" }}>
						<h3 className="mb-3">Popular in 2020</h3>
						<p style={{ width: "460px", fontSize: "14px" }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
					</div>
					<div className="d-flex gap-4" style={{ position: "absolute", top: "66%", left: "50%", transform: "translate(-50%, -50%)" }}>
						{content.map((item, i) => {
							if (i === popularNo)
								return item.map((data) => (
									<img key={data.id} src={data.image} alt={data.id} style={{ height: "180px", width: "120px", borderRadius: "14px", border: "2px white solid", cursor: "pointer" }} />
								));
							return null;
						})}
					</div>
					<div
						className="d-flex shadow align-items-center justify-content-center rounded-circle"
						style={{ position: "absolute", top: "60%", right: "4%", zIndex: "10", height: "40px", width: "40px", background: "rgba(255,255,255,1)", cursor: "pointer" }}
						onClick={countPopular}
					>
						<i className="bi bi-chevron-right" style={{ fontSize: "24px" }}></i>
					</div>
				</div>
			</div>
		);
	};

	const renderSpecialOffers = () => {
		const content = [];
		const booksToDisplaySpecialNo = 3;

		for (let i = 0; i < specialOffersData.length / booksToDisplaySpecialNo; i++) {
			const copyBooks = [...specialOffersData];
			const booksToDisplay = copyBooks.splice(booksToDisplaySpecialNo * i, booksToDisplaySpecialNo);
			content.push(booksToDisplay);
		}

		return (
			<div>
				<div className="text-center mx-auto" style={{ width: "500px" }}>
					<h2 className="mb-4">Special Offers</h2>
					<p className="mb-5" style={{ fontSize: "14px" }}>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
					</p>
				</div>
				<div className="row">
					{content.map((item, i) => {
						if (i === specialNo)
							return item.map((data) => (
								<div className="col-md-4">
									<div className="border" style={{ borderRadius: "14px" }}>
										<img src={data.image} alt={data.id} style={{ width: "100%" }} />
										<div className="p-3">
											<h5 className="mt-3">{data.title}</h5>
											<div className="mb-3">
												{data.tags.map((t) => (
													<span className="text-uppercase px-2 py-1 bg-primary-soft text-primary rounded-pill me-2" style={{ fontSize: "10px" }}>
														{t}
													</span>
												))}
											</div>
											<p style={{ fontSize: "14px" }}>{data.synopsis}</p>
											<p style={{ fontSize: "16px", fontWeight: "600" }}>{data.author}</p>
											<div className="mt-4 d-flex align-items-center">
												<button className="btn btn-primary d-flex align-items-center gap-2 px-4 py-2">
													<i className="bi bi-bag-plus"></i>
													<span>Add to Cart</span>
												</button>
												<div className="ms-auto d-flex gap-2 align-items-center">
													<p className="mb-0 text-grey-1" style={{ textDecoration: "line-through" }}>
														RM {data.price}
													</p>
													<p className="mb-0" style={{ fontWeight: "600", fontSize: "20px" }}>
														RM {data.discounted_price}
													</p>
												</div>
											</div>
										</div>
									</div>
								</div>
							));
						return null;
					})}
					<div className="mt-3 d-flex gap-2 align-items-center justify-content-center">
						<div
							className="bg-primary-soft text-primary d-flex align-items-center justify-content-center rounded-pill"
							style={{ height: "28px", width: "28px", cursor: "pointer" }}
							onClick={countSpecialUp}
						>
							<i className="bi bi-arrow-left" style={{ fontSize: "20px" }}></i>
						</div>
						<div
							className="bg-primary-soft text-primary d-flex align-items-center justify-content-center rounded-pill"
							style={{ height: "28px", width: "28px", cursor: "pointer" }}
							onClick={countSpecialDown}
						>
							<i className="bi bi-arrow-right" style={{ fontSize: "20px" }}></i>
						</div>
					</div>
				</div>
			</div>
		);
	};

	const renderFlashSale = () => {
		return (
			<div>
				<div className="text-center mx-auto" style={{ width: "500px", position: "relative" }}>
					<img
						style={{ width: "50px", position: "absolute", zIndex: "-1", top: "0%", right: "0%", transform: "translate(-320%, -40%)" }}
						src={require("../assets/images/hero-flash/flash_sale.svg").default}
						loading="lazy"
						alt="flashsale"
					/>
					<h2 className="mb-4">Flash Sale</h2>
					<p className="mb-5" style={{ fontSize: "14px" }}>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
					</p>
				</div>
			</div>
		);
	};

	return (
		<MainLayout>
			<div className="container">
				<div className="row mb-5">
					<div className="col-md-9">
						<HeroBanner />
					</div>
					<div className="col-md-3">
						<HeroBestSelling books={books} />
					</div>
				</div>
				<div className="row mb-5">{renderPromises()}</div>
				<div className="row mb-5">
					{renderRecommended()}
					{renderPopular()}
				</div>
				<div className="mb-5">{renderSpecialOffers()}</div>
				<div className="mb-5">{renderFlashSale()}</div>
			</div>
		</MainLayout>
	);
}
