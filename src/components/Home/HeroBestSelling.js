import { useEffect, useState } from "react";

export default function HeroBestSelling({ books }) {
	const [bookNo, setBookNo] = useState(0);
	const [bestSellingBooks, setBestSellingBooks] = useState([]);

	useEffect(() => {
		const filterBestSelling = books.filter((b) => b.is_bestselling);
		setBestSellingBooks(filterBestSelling);
	}, [books]);

	const countUp = () => {
		let currentNo = bookNo;
		currentNo++;
		if (currentNo === bestSellingBooks.length) return setBookNo(0);
		setBookNo(currentNo);
	};
	const countDown = () => {
		let currentNo = bookNo;
		currentNo--;
		if (currentNo < 0) return setBookNo(bestSellingBooks.length - 1);
		setBookNo(currentNo);
	};

	return (
		<div className="bg-grey-1" style={{ position: "relative", height: "500px", width: "100%", borderRadius: "24px" }}>
			<div className="py-3" style={{ textAlign: "center", position: "absolute", zIndex: "10", height: "100%", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
				<h2 className="text-white" style={{ fontSize: "32px", fontWeight: "600" }}>
					Best Selling
				</h2>
				<p className="text-white" style={{ fontSize: "14px" }}>
					Based sales this week
				</p>
				{bestSellingBooks.map((item, i) => {
					if (i === bookNo)
						return (
							<>
								<div className="mb-2" style={{ width: "200px" }}>
									<img src={item.image} alt={item.title} loading="lazy" style={{ width: "80%", borderRadius: "12px", border: "2px white solid" }} />
								</div>
								<h5 className="text-white">{item.title}</h5>
								<p className="text-uppercase text-white" style={{ fontSize: "10px" }}>
									{item.genres.map((g, index) => (
										<span key={index}>
											{g}
											{!(index === item.genres.length - 1) && ", "}
										</span>
									))}
								</p>
								<button className="btn btn-light">
									<span className="mx-1" style={{ fontWeight: "600" }}>
										RM {item.price.toFixed(2)}
									</span>
								</button>
							</>
						);
					return null;
				})}
			</div>
			{bestSellingBooks.map((item, i) => {
				if (i === bookNo)
					return (
						<>
							<div style={{ position: "relative", height: "100%", zIndex: "1" }}>
								<img src={item.image} alt="book2cover" style={{ height: "100%", width: "100%", borderRadius: "24px" }} />
							</div>
							<div
								style={{
									height: "100%",
									width: "100%",
									background: "rgba(0,0,0,0.2)",
									position: "absolute",
									top: "0px",
									left: "0px",
									backdropFilter: "blur(5px)",
									borderRadius: "24px",
									zIndex: "5",
								}}
							></div>
						</>
					);
				return null;
			})}

			<div
				className="text-white rounded-circle text-center"
				style={{ position: "absolute", top: "50%", left: "10%", zIndex: "10", height: "24px", width: "24px", background: "rgba(0,0,0,0.3)", cursor: "pointer" }}
				onClick={countDown}
			>
				<i className="bi bi-chevron-left"></i>
			</div>
			<div
				className="text-white rounded-circle text-center"
				style={{ position: "absolute", top: "50%", right: "10%", zIndex: "10", height: "24px", width: "24px", background: "rgba(0,0,0,0.3)", cursor: "pointer" }}
				onClick={countUp}
			>
				<i className="bi bi-chevron-right"></i>
			</div>
		</div>
	);
}
