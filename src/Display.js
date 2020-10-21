import React from 'react';

const Display = (props) => {
	const { cereals } = props;

	const loaded = () => (
		<div style={{ textAlign: 'center' }}>
			{cereals.map((cereal) => (
				<article>
					<img src={cereal.img} />
					<h1>Name: {cereal.name}</h1>
					<h3>Brand: {cereal.brand}</h3>
					<h3>Type: {cereal.type}</h3>
					<button
						onClick={() => {
							props.selectCereal(cereal);
							props.history.push('/edit');
						}}>
						Edit
					</button>
					<button
						onClick={() => {
							props.deleteCereal(cereal);
						}}>
						Delete
					</button>
				</article>
			))}
		</div>
	);
	return cereals.length > 0 ? loaded() : <h1>Loading...</h1>;
};

export default Display;
