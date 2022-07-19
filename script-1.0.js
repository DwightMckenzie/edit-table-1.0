const crntData = document.getElementById('crnt-data');
const editPnl = document.querySelectorAll('.edit-pnl');
const btnAdd = document.getElementById('nw-add');
const btnClrStrg = document.getElementById('clr-strge');

// save new
function newSave(btn) {
	console.log('save new');
	
	const cntrlsRw = btn.parentElement.parentElement.parentElement;
	const newRw = cntrlsRw.previousElementSibling;
	const btnOpt = document.querySelectorAll('.opt-btn');

	// retrieve current index from localstorage for updating
	let prsnLst = JSON.parse(localStorage.getItem('prsn-lst'));

	// only read input fields of active row
	if (newRw.classList.contains('active')) {
			// retrieve current values from fields of active row
		let fNameFld = newRw.children[0].children[0].textContent;
		let lNameFld = newRw.children[1].children[0].textContent;
		let phoneFld = newRw.children[2].children[0].textContent;
		let emailFld = newRw.children[3].children[0].textContent;

		let prsn = {
			fname : fNameFld,
			lname : lNameFld,
			phone : phoneFld,
			email : emailFld
		}

		prsnLst.push(prsn);

		// update localstorage with new values
		localStorage.setItem('prsn-lst', JSON.stringify(prsnLst));

		const inptFlds = newRw.children.length;

		for (let i = 0; i < inptFlds; i++) {
			let inptFld = newRw.children[i].children[0];

			if (inptFld.classList.contains('inpt-fld')) {
				inptFld.removeAttribute('contentEditable');
			}
		}

		// remove active and open classes
		newRw.classList.remove('active');
		newRw.hidden = true;

		// show buttons
		btnOpt.forEach((el) => {
			el.hidden = true;
		});

		loadList();

	}

}

// cancel new
function newCancel(btn) {
	console.log('cancel new');

	const cntrlRw = btn.parentElement.parentElement.parentElement;
	const newRw = cntrlRw.previousElementSibling;
	const btnOpt = document.querySelectorAll('.opt-btn');

	// only effect active row
	if (newRw.classList.contains('active')) {

		const inptFlds = newRw.children.length;

		for (let i = 0; i < inptFlds; i++) {
			let inptFld = newRw.children[i].children[0];

			if (inptFld.classList.contains('inpt-fld')) {
				inptFld.removeAttribute('contentEditable');
			}
		}

		// remove active and open classes
		newRw.classList.remove('active');
		newRw.hidden = true;

		// show buttons
		btnOpt.forEach((el) => {
			el.hidden = true;
		});

		loadList();

	}

}

// toggle new fields and controls
function tggleNewDataPnl() {
	// begin the closing active process
	const mainRwClss = document.querySelectorAll('.main-rw');
	const inptFlds = document.querySelectorAll('.inpt-fld');

	// search and remove other active and edit row
	mainRwClss.forEach((el) => {
		if (el.classList.contains('active')) {
			el.nextElementSibling.remove();
			el.classList.remove('active');
		}
	});

	// remove content editable from evry input field
	inptFlds.forEach((inptFld) => {
		inptFld.removeAttribute('contentEditable');
	});

	// begin the new row process
	const nwDataRw = document.getElementById('nw-data-rw');
	const btnOpt = document.querySelectorAll('.opt-btn');
	
	// show input fields, and Cancel Save buttons
	nwDataRw.hidden = false;
	nwDataRw.classList.add('active');

	// show buttons
	btnOpt.forEach((el) => {
		el.hidden = false;
	});

	// apply content editable to input fields
	// of the currently selected row
	if (nwDataRw.classList.contains('active')) {
		// make active row input fields editable
		const actRw = document.querySelector('.active');
		const inptFlds = actRw.children.length;

		for (let i = 0; i < inptFlds; i++) {
			let inptFld = actRw.children[i].children[0];

			if (inptFld.classList.contains('inpt-fld')) {
				inptFld.setAttribute('contentEditable', true);
			}
		}
	}
}

// cancel edit row
function editCancel(btn) {
	console.log('cancel edit');

	const editRw = btn.parentElement.parentElement.parentElement;
	const mainRwId = editRw.previousElementSibling;

	// only effect active row
	if (mainRwId.classList.contains('active')) {

		const inptFlds = mainRwId.children.length;

		for (let i = 0; i < inptFlds; i++) {
			let inptFld = mainRwId.children[i].children[0];

			if (inptFld.classList.contains('inpt-fld')) {
				inptFld.removeAttribute('contentEditable');
			}
		}

		// remove active and open classes
		mainRwId.classList.remove('active');
		mainRwId.nextElementSibling.classList.remove('open');

		loadList();
	
	}

}

// delete edit
function editDelete() {
	console.log('delete');

	const actRw = document.querySelector('.active');
	const tblRwIndx = actRw.id;
	// const inptFlds = document.querySelectorAll('.inpt-fld');

	// console.log(tblRwIndx);

	// refresh list
	// get the current stored list
	let prsnLst = JSON.parse(localStorage.getItem('prsn-lst'));

	prsnLst.splice(tblRwIndx, 1);

	localStorage.setItem('prsn-lst', JSON.stringify(prsnLst));

	loadList();

}

// save edit
function editSave(btn) {
	console.log('save');

	const saveRw = btn.parentElement.parentElement.parentElement;
	const mainRw = saveRw.previousElementSibling;
	const mainRwId = mainRw.id;

	// retrieve current index from localstorage for updating
	let prsnLst = JSON.parse(localStorage.getItem('prsn-lst'));
	let prsnCrntId = prsnLst[mainRwId];
	
	// only read input fields of active row
	if (mainRw.classList.contains('active')) {
		// retrieve current values from fields of active row
		let fNameFld = mainRw.children[0].children[0].textContent;
		let lNameFld = mainRw.children[1].children[0].textContent;
		let phoneFld = mainRw.children[2].children[0].textContent;
		let emailFld = mainRw.children[3].children[0].textContent;
		
		// update index properties with value changes from input fields
		prsnCrntId.fname = fNameFld;
		prsnCrntId.lname = lNameFld;
		prsnCrntId.phone = phoneFld;
		prsnCrntId.email = emailFld;

		// update localstorage with new values
		localStorage.setItem('prsn-lst', JSON.stringify(prsnLst));

		// remove active and open classes
		// mainRwId.classList.remove('active');
		// mainRwId.nextElementSibling.classList.remove('open');

		loadList();

	}
	
}

// show hide edit panel when edit button clicked
function tgglEditPnl(btn) {

	// close new row process
	const newRw = document.querySelector('.nw-data-rw');
	const btnOpt = document.querySelectorAll('.opt-btn');

	// only effect active row
	if (newRw.classList.contains('active')) {

		const inptFlds = newRw.children.length;

		for (let i = 0; i < inptFlds; i++) {
			let inptFld = newRw.children[i].children[0];

			if (inptFld.classList.contains('inpt-fld')) {
				inptFld.removeAttribute('contentEditable');
			}
		}

		// remove active and open classes
		newRw.classList.remove('active');
		newRw.hidden = true;

		// show buttons
		btnOpt.forEach((el) => {
			el.hidden = true;
		});

		loadList();

	}

	// begin edit row process
	const path = btn.composedPath(); // needed to be composed, chrome deprecated
	const rwId = path[3].id;
	const mainRwClss = document.querySelectorAll('.main-rw');
	const inptFlds = document.querySelectorAll('.inpt-fld');
	let tblRw = document.getElementById(rwId);
	
	// if does not contain class list active
	if (!tblRw.classList.contains('active')) {
		console.log('add edit row');

		// search and remove other active and edit row
		mainRwClss.forEach((el) => {
			if (el.classList.contains('active')) {
				el.nextElementSibling.remove();	
				el.classList.remove('active');
			}
		});

		// remove content editable from evry input field
		inptFlds.forEach((inptFld) => {
			inptFld.removeAttribute('contentEditable');
		});

		// add active to the currently selected row
		tblRw.classList.add('active');

		// apply content editable to input fields
		// of the currently selected row
		if (tblRw.classList.contains('active')) {
			// make active row input fields editable
			const actRw = document.querySelector('.active');
			const inptFlds = actRw.children.length;

			for (let i = 0; i < inptFlds; i++) {
				let inptFld = actRw.children[i].children[0];

				if (inptFld.classList.contains('inpt-fld')) {					
					inptFld.setAttribute('contentEditable', true);
				}
			}
		}

		// create edit row apply buttons, show edit row
		let tr = document.createElement('tr');
		tblRw.after(tr);
		tr.setAttribute('class', 'edit-rw');
		
		const editCell = `<td colspan="5">
			<div class="cntrl-pnl">
				<button class="edt" onclick="editCancel(this)">Cancel</button>
				<button class="edt" onclick="editDelete(this)">Delete</button>
				<button class="edt" onclick="editSave(this)">Save</button>
			</div>
		</td>`;

		tr.innerHTML = editCell;
		
	} else {
		console.log('remove edit row');

		// close delete edit row
		tblRw.nextElementSibling.remove();

		// remove content editable from evry input field
		inptFlds.forEach((inptFld) => {
			inptFld.removeAttribute('contentEditable');
		});

		tblRw.classList.remove('active');

	}

}

// get default names from local storage and display on table 
function loadList() {
	const tbody = crntData;

	let prsnLst = JSON.parse(localStorage.getItem('prsn-lst'));

	crntData.innerHTML = '';

	prsnLst.forEach((prsn, i) => {
		tbody.innerHTML +=
		`<tr class="main-rw" id="${i++}">
			<td><div class="inpt-fld">${prsn.fname}</div></td>
			<td><div class="inpt-fld">${prsn.lname}</div></td>
			<td><div class="inpt-fld">${prsn.phone}</div></td>
			<td><div class="inpt-fld">${prsn.email}</div></td>
			<td><div class="edit-btn"><i class="fas fa-pen"></i></div></td>
		</tr>`;
	});

	const btnEdit = document.querySelectorAll('.edit-btn');

	btnEdit.forEach((btn) => {
		btn.addEventListener('click', tgglEditPnl);
	});
}

// clear the local storage upen request
function clrStrge() {
	console.log('clear');

	localStorage.removeItem('prsn-lst');

	let msg = 'Storage Cleared! Thank you for testing this demo.';

	alert(msg);

}

// alert the person demoing this product
function notice() {
	let msg = `Notice! This demo uses the browser's local storage. Although harmless, it is recommended that you click the "Clear" button at the bottom of the table, when finished with this demo. Also please note: The preloaded names are of fiction. Enjoy the demo.`;
	
	alert(msg);
}

// load default names to local storage
function dummyNames() {
	let prsnLst = [
		{
			fname: "Jane",
			lname: "Doe",
			phone: '456-554-1223',
			email: "janedoe@example.com"
		},
		{
			fname: "John",
			lname: "Doe",
			phone: '435-554-1523',
			email: "johndoe@example.com"
		}
	];

	localStorage.setItem('prsn-lst', JSON.stringify(prsnLst));

	loadList();

}

// on load
notice();
dummyNames();

// event listeners
btnAdd.addEventListener('click', tggleNewDataPnl);
btnClrStrg.addEventListener('click', clrStrge);