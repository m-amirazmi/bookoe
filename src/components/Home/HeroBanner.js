import React from "react";
import { useState } from "react";
import { hero } from "../../db/hero";

export default function HeroBanner() {
	const [bannerNo, setBannerNo] = useState(0);

	return (
		<div style={{ position: "relative", height: "500px", width: "100%", borderRadius: "24px", background: "#F2F0FE" }}>
			<div style={{ position: "relative", height: "100%" }}>
				<img
					src={require("../../assets/images/home-hero/circle-orange.svg").default}
					alt="circle-orange"
					style={{ width: "350px", position: "absolute", right: "0px", borderTopRightRadius: "24px" }}
				/>
				<img
					src={require("../../assets/images/home-hero/circle-purple.svg").default}
					alt="circle-purple"
					style={{ width: "300px", position: "absolute", bottom: "0px", left: "0px", transform: "translate(130%, 0%)" }}
				/>
				<img src={require("../../assets/images/home-hero/dots-2.svg").default} alt="dots-2" style={{ position: "absolute", bottom: "0px", left: "0px", transform: "translate(670%, -160%)" }} />
				<img src={require("../../assets/images/home-hero/dots-1.svg").default} alt="dots-1" style={{ position: "absolute", top: "0px", left: "0px", transform: "translate(100%, 100%)" }} />
			</div>
			{hero.map((item) => {
				if (item.id === bannerNo)
					return (
						<div style={{ position: "absolute", top: "0px", left: "0px", width: "500px", transform: "translate(16%, 50%)" }}>
							<h6 className="text-primary text-uppercase" style={{ letterSpacing: "2px", fontSize: "12px" }}>
								{item.event}
							</h6>
							<h2 style={{ fontWeight: "700", fontSize: "50px" }}>{item.title}</h2>
							<h4>{item.subtitle}</h4>
							<p style={{ fontSize: "12px" }}>{item.description}</p>
							<div>
								<button className="shadow btn btn-primary px-3 py-2">
									<span>{item.cta_primary_text}</span>
								</button>
								{item.cta_secondary_text && (
									<button className="btn">
										<span className="text-dark">{item.cta_secondary_text}</span>
									</button>
								)}
							</div>
						</div>
					);
				return null;
			})}
			<div className="mt-5 d-flex gap-2" style={{ position: "absolute", bottom: "0px", left: "0px", transform: "translate(200%, -1200%)" }}>
				<div
					className={bannerNo === 0 && "bg-primary"}
					style={{ width: "8px", height: "8px", borderRadius: "24px", cursor: "pointer", background: bannerNo !== 0 && "#D7D0FB" }}
					onClick={() => setBannerNo(0)}
				></div>
				<div
					className={bannerNo === 1 && "bg-primary"}
					style={{ width: "8px", height: "8px", borderRadius: "24px", cursor: "pointer", background: bannerNo !== 1 && "#D7D0FB" }}
					onClick={() => setBannerNo(1)}
				></div>
				<div
					className={bannerNo === 2 && "bg-primary"}
					style={{ width: "8px", height: "8px", borderRadius: "24px", cursor: "pointer", background: bannerNo !== 2 && "#D7D0FB" }}
					onClick={() => setBannerNo(2)}
				></div>
			</div>
		</div>
	);
}
