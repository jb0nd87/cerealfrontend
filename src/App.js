import React from 'react';
import './App.css';
import { Route, Link, Switch } from 'react-router-dom';
import Display from './Display';
import Form from './Form';

function App() {
	const url = 'https://cerealbackend.herokuapp.com';
	const [cereals, setCereals] = React.useState([]);
	const emptyCereal = {
		name: '',
		brand: '',
    type: '',
    img: '',
	};

	const [selectedCereal, setSelectedCereal] = React.useState(emptyCereal);

	const getCereals = () => {
		fetch(url + '/cereal/')
			.then((response) => response.json())
			.then((data) => {
				setCereals(data);
			});
	};

	React.useEffect(() => getCereals(), []);

	const handleCreate = (newCereal) => {
		fetch(url + '/cereal/', {
			method: 'post',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(newCereal),
		}).then((response) => getCereals());
	};

	const handleUpdate = (cereal) => {
		fetch(url + '/cereal/' + cereal._id, {
			method: 'put',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(cereal),
		}).then((response) => getCereals());
	};

	const selectCereal = (cereal) => {
		setSelectedCereal(cereal);
	};

	const deleteCereal = (cereal) => {
		fetch(url + '/cereal/' + cereal._id, {
			method: 'delete',
		}).then((response) => getCereals());
	};

	return (
		<div className='App'>
      <p>
        <img src='https://media.giphy.com/media/ssTiPstEcfXDq/giphy.gif'/>
      </p>
			<h1>CEREAL SHOPPING LIST</h1>
			<hr />
			<Link to='/create'>
				<button>Add Cereal</button>
			</Link>
			<main>
				<Switch>
					<Route
						exact
						path='/'
						render={(rp) => (
							<Display
								{...rp}
								cereals={cereals}
								selectCereal={selectCereal}
								deleteCereal={deleteCereal}
							/>
						)}
					/>
					<Route
						exact
						path='/create'
						render={(rp) => (
							<Form
								{...rp}
								label='create'
								cereal={emptyCereal}
								handleSubmit={handleCreate}
							/>
						)}
					/>
					<Route
						exact
						path='/edit'
						render={(rp) => (
							<Form
								{...rp}
								label='update'
								cereal={selectedCereal}
								handleSubmit={handleUpdate}
							/>
						)}
					/>
				</Switch>
			</main>
		</div>
	);
}

export default App;
