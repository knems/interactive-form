'use strict'

document.addEventListener('DOMContentLoaded', () => {

	const otherTitle = document.getElementById('other-title');
	const userTitle = document.getElementById('title');
	const tShirtDesignSelect = document.getElementById('design');
	const tShirtDesignColor = document.getElementById('color');

	//T-shirt infor design/color match function
	tShirtDesignSelect.addEventListener("change", (e) => {
		let shirt = e.target.value;

		let dontShowShirt = (x) => {
			for(let i = 0; i < tShirtDesignColor.length; i++){
				let shirt = tShirtDesignColor[i];
				shirt.innerHTML.indexOf(x) != -1 ? shirt.style.display = "none" : shirt.style.display = "";
			}
		}

		if(shirt == "select"){
			for(let i = 0; i < tShirtDesignColor.length; i++){
				tShirtDesignColor[i].style.display = "";
			}
		}else{
			shirt == "js puns" ? dontShowShirt('I') : dontShowShirt('Puns');
		}
	});

	const activities = document.getElementsByClassName("activities")[0];
	const checkbox = activities.getElementsByTagName('input');
	const activitiesCostTotalElement = document.getElementById('activitiesCostTotal');
	let activitiesCostTotal = 0;

	//function to enabled / disable checkboxes when times and days are contradicting
	activities.addEventListener("change", (e) => {

		let checkboxChecked = e.target.checked;
		let checkboxName = e.target.name;

		let priceAdjustment = (price) => {
			return checkboxChecked ? activitiesCostTotal += price : activitiesCostTotal -= price;
		}

		let enableBox = (i, price) => {
			//terenary condition returning the contradicting checkbox, enabling it when the
			//target id deselected or selected
			priceAdjustment(price);
			return checkboxChecked ? checkbox[i].disabled = true : checkbox[i].disabled = false;
		}

		if (checkboxName == 'js-frameworks') {
			enableBox(3, 100);
		}else if (checkboxName == 'js-libs') {
			enableBox(4, 100);
		}else if (checkboxName == 'express') {
			enableBox(1, 100);
		}else if (checkboxName == 'node') {
			enableBox(2, 100);
		}else if (checkboxName == 'all') {
			priceAdjustment(200);
		}else if (checkboxName == 'build-tools' || checkboxName == 'npm') {
			priceAdjustment(100);
		}

		activitiesCostTotalElement.innerHTML = 'Total: $0';
		activitiesCostTotalElement.innerHTML += activitiesCostTotal.toString();
	});

	const paymentMethod = document.getElementById('payment');
	const creditCardPayment = document.getElementById('credit-card');
	const bitcoinMessage = document.getElementById('bitcoin message');
	const paypalMessage = document.getElementById('paypal message');

	creditCardPayment.style.display = "none";
	paypalMessage.style.display = "none";
	bitcoinMessage.style.display = "none";

	paymentMethod.addEventListener("change", (e) => {
		let selected = e.target.value;

		if(selected != "select_method" || selected == "selected_method"){
			creditCardPayment.style.display = "none";
			paypalMessage.style.display = "none";
			bitcoinMessage.style.display = "none";}

		selected == "credit card" ? creditCardPayment.style.display = "" : creditCardPayment.style.display = "none";
		selected == "paypal" ? paypalMessage.style.display = "" : paypalMessage.style.disaplay = "none";
		selected == "bitcoin" ? bitcoinMessage.style.display = "" : bitcoinMessage.style.display = "none";
	});

	//Other job role open input when selected / deselected
	userTitle.addEventListener("change", (e) => {
		let selected = e.target.value;
		selected == "other" ? otherTitle.style.display = "" : otherTitle.style.display = "none";
	});

	const name = document.getElementById('name');
	const email = document.getElementById('mail');
	//const activities = document.getElementsByClassName("activities")[0];
	const cc_num = document.getElementById('cc-num');
	const zip = document.getElementById('zip');
	const cvv = document.getElementById('cvv');
	const submitButton = document.querySelectorAll('button[type=submit]')[0];

	// name.style.border = '.3em solid red';

	submitButton.addEventListener('click', (e) => {
		let msg = '';
		e.preventDefault();

		if(!name.value.length > 0) {
			name.style.border = '.3em solid red';
		} else {
			name.style.border = '';}

		if(!email.value.length > 0){
			email.style.border = '.3em solid red';
		} else {
			name.style.border = '';}

		for(let i = 0; i < activities.length; i++){
			if(activities[i].value.checked){
				break;
			}else if (activities[activities.length].value.checked) {
				activities.style.color = 'red';
			}
		}
		if(!cc_num.value.length > 0){

		}
		scroll(0,0);
	});
  //hide t shirt design colors
	document.getElementById('name').select();
	otherTitle.style.display = "none";
});


//name email activity and credit card fields.
