import React, { useState, useEffect, useRef } from "react";
import Item from "./Item";
import ListItem from "./ListItem";

export const TodoApp = () => {
	let [lista, setLista] = useState([]);
	let [tarea, setTarea] = useState("");

	useEffect(() => {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/GilbertMarin", {
			method: "POST",
			body: JSON.stringify([]),
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(resp => {
				fetch(
					"https://assets.breatheco.de/apis/fake/todos/user/GilbertMarin",
					{
						method: "GET",

						headers: {
							"Content-Type": "application/json"
						}
					}
				)
					.then(resp => {
						return resp.json();
					})
					.then(data => {
						setLista(data);
					})

					.catch(err => {
						console.log("error", err);
					});
			})

			.catch(err => {
				console.log("error", err);
			});
	}, []);

	const addTarea = tarea => {
		const ListaTemp = [...lista];
		if (tarea.key === "Enter") {
			let newObj = {
				label: tarea.target.value,
				done: false
			};
			setLista([...lista, newObj]);

			tarea.target.value = "";
		}
	};
	fetch("https://assets.breatheco.de/apis/fake/todos/user/GilbertMarin", {
		method: "PUT",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(lista)
	})
		.then(resp => {
			//setLista(lista);
			console.log("Respuesta agregado correctamente", resp);
		})
		.catch(error => {
			console.log("Error add", error);
		});

	const delTarea = pos => {
		const tempList = [...lista];

		tempList.splice(pos, 1);

		const methods = ["PUT", "DELETE"];
		if (tempList.length > 0) {
			fetch(
				"https://assets.breatheco.de/apis/fake/todos/user/GilbertMarin",
				{
					method: methods[0],
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify(tempList)
				}
			)
				.then(resp => {
					setLista(tempList);
				})
				.catch(error => {
					console.log("Error delete", error);
				});
		} else {
			fetch(
				"https://assets.breatheco.de/apis/fake/todos/user/GilbertMarin",
				{
					method: methods[1],
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify(tempList)
				}
			)
				.then(resp => {
					setLista(tempList);
				})
				.catch(error => {
					console.log("Error delete", error);
				});
		}
	};

	const newList = lista.map((value, index) => (
		<Item key={index} value={value} index={index} onClick={delTarea} />
	));

	return (
		<div className="text-center mt-5">
			<div className="container">
				<div className="row">
					<div className="col-12 col-md-6">
						<h6 className="text-muted">To Do List</h6>
						<input
							id="campito"
							onKeyDown={addTarea}
							className="form-control"
							type="text"
							placeholder="Add a Task"
							onChange={e => setTarea(e.target.value)}></input>
						<br />
						<ListItem list={newList} />
					</div>
				</div>
			</div>
			<p>Total Items: {lista.length}</p>
		</div>
	);
};

