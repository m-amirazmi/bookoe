import { useState } from "react";
import logo from "../../assets/images/logo.svg";
import styles from "../../assets/styles/modules/navbar.module.scss";

const menuData = [
	{
		id: "1",
		name: "GENRES",
		tag: "genres",
		data: [
			{
				id: "c1",
				name: "action",
				link: "?genre=action",
			},
			{
				id: "c2",
				name: "romantic",
				link: "?genre=romantic",
			},
			{
				id: "c3",
				name: "adventure",
				link: "?genre=adventure",
			},
			{
				id: "c4",
				name: "horror",
				link: "?genre=horror",
			},
			{
				id: "c5",
				name: "mystery",
				link: "?genre=mystery",
			},
			{
				id: "c6",
				name: "western",
				link: "?genre=western",
			},
			{
				id: "c7",
				name: "young adult",
				link: "?genre=young_adult",
			},
			{
				id: "c8",
				name: "drama",
				link: "?genre=drama",
			},
			{
				id: "c10",
				name: "science fiction",
				link: "?genre=science_fiction",
			},
		],
	},
	{
		id: "2",
		name: "CATEGORIES",
		tag: "categories",
		data: [
			{
				id: "cat1",
				name: "biographies",
				link: "?category=biographies",
			},
			{
				id: "cat2",
				name: "business",
				link: "?category=business",
			},
			{
				id: "cat3",
				name: "comics",
				link: "?category=comics",
			},
			{
				id: "cat4",
				name: "cooking",
				link: "?category=cooking",
			},
			{
				id: "cat5",
				name: "entertainment",
				link: "?category=entertainment",
			},
			{
				id: "cat6",
				name: "health & fitness",
				link: "?category=health_fitness",
			},
			{
				id: "cat7",
				name: "history",
				link: "?category=history",
			},
			{
				id: "cat8",
				name: "hobbies & crafts",
				link: "?category=hobbies",
			},
			{
				id: "cat9",
				name: "self help",
				link: "?category=self_help",
			},
		],
	},
	{
		id: "3",
		name: "AUTHORS",
		tag: "authors",
		data: [
			{
				id: "aut1",
				name: "Henry Fielding",
				link: "?author=henry_fielding",
			},
			{
				id: "aut2",
				name: "Jane Austen",
				link: "?author=jane_austen",
			},
			{
				id: "aut3",
				name: "Stendhal",
				link: "?author=stendhal",
			},
			{
				id: "aut4",
				name: "Honoré de Balzac",
				link: "?author=honore_de_balzac",
			},
			{
				id: "aut5",
				name: "Charles Dickens",
				link: "?author=charles_dickens",
			},
			{
				id: "aut6",
				name: "Gustave Flaubert",
				link: "?author=gustave_flaubert",
			},
			{
				id: "aut7",
				name: "Herman Melville",
				link: "?author=herman_melville",
			},
			{
				id: "aut8",
				name: "Emily Brontë",
				link: "?author=emily_bronte",
			},
			{
				id: "aut9",
				name: "William Shakespeare",
				link: "?author=william_shakespeare",
			},
		],
	},
	{
		id: "4",
		name: "PUBLICATIONS",
		tag: "publications",
		data: [
			{
				id: "pub1",
				name: "Sunway Uni Press",
				link: "?publication=sunway_university_press",
			},
			{
				id: "pub2",
				name: "Kechara M & P",
				link: "?publication=kechara_media_publications",
			},
			{
				id: "pub3",
				name: "Future Ace Publishing",
				link: "?publication=future_ace_publishing",
			},
			{
				id: "pub4",
				name: "Kanyin Publications",
				link: "?publication=kanyin_publications",
			},
			{
				id: "pub5",
				name: "Random House Inc.",
				link: "?publication=random_house_inc",
			},
			{
				id: "pub6",
				name: "HarperCollins Pub",
				link: "?publication=harpercollins_publishers",
			},
			{
				id: "pub7",
				name: "Pearson",
				link: "?publication=pearson",
			},
			{
				id: "pub8",
				name: "O'Reilly Media Inc",
				link: "?publication=oreilly_media",
			},
			{
				id: "pub9",
				name: "Sasbadi",
				link: "?publication=sasbadi",
			},
		],
	},
	{
		id: "5",
		name: "BEST SELLING",
		tag: "best_selling",
		data: [
			{
				id: "book1",
				name: "The Adventures of Lily",
				link: "?title=the_adventures_of_lily",
				image: require("../../assets/images/books/The Adventures of Lily.png").default,
			},
			{
				id: "book2",
				name: "The Sound of Waves",
				link: "?title=the_sound_of_waves",
				image: require("../../assets/images/books/The Sound of Waves.png").default,
			},
		],
	},
];

export default function Navbar() {
	const [showMenu, setShowMenu] = useState(false);

	const renderLogo = () => {
		return (
			<div className="me-5">
				<img src={logo} alt="logo" />
			</div>
		);
	};

	const renderMenuButton = () => {
		return (
			<button className={`${styles.menuButton} px-3 py-2 pe-auto btn btn-primary`} onClick={() => setShowMenu(!showMenu)}>
				<i className="bi bi-grid"></i>
				<span className="mx-2">Menu</span>
				<i className={showMenu ? "bi bi-chevron-up" : "bi bi-chevron-down"}></i>
			</button>
		);
	};

	const renderSearch = () => {
		return (
			<div className="mx-3">
				<div className="position-relative">
					<input className={`${styles.searchInput} form-control py-2 border-primary-soft`} type="text" placeholder="Search over 30 million book titles" />
					<span className={`${styles.searchInputIcon} px-3 bg-white`}>
						<i className="bi bi-search text-primary"></i>
					</span>
				</div>
			</div>
		);
	};

	const renderWishlistLink = () => {
		return (
			<div className={`${styles.icon} px-2`}>
				<i className="bi bi-heart"></i>
			</div>
		);
	};

	const renderCartLink = () => {
		return (
			<div className={`${styles.icon} px-2`}>
				<i className="bi bi-bag"></i>
			</div>
		);
	};

	const renderAccountLink = () => {
		return (
			<div className={`${styles.icon} px-2`}>
				<i className="bi bi-person" style={{ fontSize: "24px" }}></i>
			</div>
		);
	};

	const renderMenu = () => {
		if (showMenu)
			return (
				<>
					<div className={`${styles.menuContainer} container`}>
						<div className={`${styles.menu} bg-white rounded px-4`}>
							<div className="row">
								{menuData.map((item) => {
									if (item.tag === "best_selling")
										return (
											<div className="col-md-4 border-start border-primary-soft border-2 px-4 py-2 my-3 bg-primary-soft rounded">
												<h5 key={item.id} className="d-flex align-items-center mb-4">
													<span>{item.name}</span>
													<span className="ms-auto text-primary" style={{ fontSize: "16px", cursor: "pointer" }}>
														+ See More
													</span>
												</h5>
												<div className="d-flex gap-4">
													{item.data.map((i) => (
														<div className={`${styles.menuItem} text-capitalize`}>
															<div key={i.id}>
																<img className="rounded" src={i.image} alt={i.name} style={{ width: "100%", height: "100%" }} />
															</div>
															<p className="mb-0 mt-3 py-2 px-3 text-center">{i.name}</p>
														</div>
													))}
												</div>
											</div>
										);
									return (
										<div className="col-md-2 py-4">
											<h5 key={item.id} className="px-3 text-center">
												{item.name}
											</h5>
											<div className="text-center">
												{item.data.map((i) => (
													<div className={`${styles.menuItem} text-capitalize mt-3`}>
														<span className="py-2 px-3">{i.name}</span>
													</div>
												))}
												<div className="mt-2">
													<span className={`${styles.menuItem} text-capitalize py-2 px-3 text-primary`}>+ more</span>
												</div>
											</div>
										</div>
									);
								})}
							</div>
						</div>
					</div>
					<div className={styles.backdrop} onClick={() => setShowMenu(false)}></div>
				</>
			);
		return null;
	};

	return (
		<nav className="border-bottom border-grey-3 py-4" style={{ position: "sticky", top: "0px", zIndex: "100", background: "white" }}>
			<div className="container d-flex align-items-center">
				{renderLogo()}
				<div className="d-flex align-items-center" style={{ width: "100%" }}>
					{renderMenuButton()}
					{renderSearch()}
					<div className="ms-auto d-flex align-items-center gap-2 text-primary">
						{renderWishlistLink()}
						{renderCartLink()}
						{renderAccountLink()}
					</div>
				</div>
			</div>
			{renderMenu()}
		</nav>
	);
}
