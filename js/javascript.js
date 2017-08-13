'use strict'

document.addEventListener('DOMContentLoaded', () => {

	const otherTitle = document.getElementById('other-title');
	const userTitle = document.getElementById('title');
	const tShirtDesignSelect = document.getElementById('design');
	const tShirtDesignColor = document.getElementById('color');

	const activities = document.getElementsByClassName("activities")[0];
	const checkbox = activities.getElementsByTagName('input');
	const activitiesCostTotalElement = document.getElementById('activitiesCostTotal');

	const paymentMethod = document.getElementById('payment');
	const creditCardPayment = document.getElementById('credit-card');
	const bitcoinMessage = document.getElementById('bitcoin message');
	const paypalMessage = document.getElementById('paypal message');

	const name = document.getElementById('name');
	const email = document.getElementById('mail');
	const cc_num = document.getElementById('cc-num');
	const zip = document.getElementById('zip');
	const cvv = document.getElementById('cvv');
	const submitButton = document.querySelectorAll('button[type=submit]')[0];

	//set the default value of the payment selector to 'credit card'
	paymentMethod.value = "credit card";

	//wait until shirt design is selected before displayed
	document.getElementById('colors-js-puns').style.display = 'none';

	//hide t-shirt design colors
	document.getElementById('name').select();

	//no display until "other" job role is selected
	otherTitle.style.display = "none";

	//T-shirt infor design/color match function
	tShirtDesignSelect.addEventListener("change", (e) => {

		//making the color input visible for selection
		document.getElementById('colors-js-puns').style.display = '';

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

	let activitiesCostTotal = 0;

	//function to enabled / disable checkboxes when times and days are contradicting
	activities.addEventListener("change", (e) => {

		//target checkbox
		let checkboxChecked = e.target.checked;
		//checkbox name
		let checkboxName = e.target.name;

		let checkBoxChangeColor = () => {
			checkboxChecked ? e.target.parentNode.style.color = 'green' : e.target.parentNode.style.color = '#000';
		}

		let priceAdjustment = (price) => {
			return checkboxChecked ? activitiesCostTotal += price : activitiesCostTotal -= price;
		}

		let enableBox = (i, price) => {
			//terenary condition returning the contradicting checkbox, enabling it when the
			//target id deselected or selected
			priceAdjustment(price);
			checkBoxChangeColor();
			checkboxChecked ? checkbox[i].style.color = 'red' : checkbox[i].style.color = '';
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
			checkBoxChangeColor();
			priceAdjustment(200);
		}else if (checkboxName == 'build-tools' || checkboxName == 'npm') {
			checkBoxChangeColor();
			priceAdjustment(100);
		}

		activitiesCostTotalElement.innerHTML = 'Total: $';
		activitiesCostTotalElement.innerHTML += activitiesCostTotal.toString();
	});

	paypalMessage.style.display = "none";
	bitcoinMessage.style.display = "none";

	paymentMethod.addEventListener("change", (e) => {
		let selected = e.target.value;

		creditCardPayment.style.display = "none";
		paypalMessage.style.display = "none";
		bitcoinMessage.style.display = "none";

		selected == "credit card" ? creditCardPayment.style.display = "" : creditCardPayment.style.display = "none";
		selected == "paypal" ? paypalMessage.style.display = "" : paypalMessage.style.disaplay = "none";
		selected == "bitcoin" ? bitcoinMessage.style.display = "" : bitcoinMessage.style.display = "none";
	});

	//Other job role open input when selected / deselected
	userTitle.addEventListener("change", (e) => {
		let selected = e.target.value;
		selected == "other" ? otherTitle.style.display = "" : otherTitle.style.display = "none";
	});

	const activityInputs = activities.getElementsByTagName('input');
	const paymentOptions = paymentMethod.getElementsByTagName('option');

	submitButton.addEventListener('click', (e) => {
		e.preventDefault();
		let msg = '';
		let activitiesInput = false;
		let activityLegend = activities.children[0];
		let numbers = /^[0-9]+$/;
		let letters = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

		let errorAlert = '';

		let errorMessage = (msg) => {
			if(errorAlert.length != 0){
				errorAlert += ', ';
			}
			errorAlert += msg;
		}

		let isNotValidNumber = (node) => {
				return !node.value.match(numbers);
			}

		let isNotValidEmail = (node) => {
				return !letters.test(node.value);
		}

		let setNodeBorderRed = (node) => {
			return node.style['box-shadow'] = '0 0 5px 2px red';
		}

		let isValid = (x, condition) => {
			if(isNotValidNumber(x) || condition){
				setNodeBorderRed(x);
			}else {
				x.style['box-shadow'] = '';
			}
		}

		if(isNotValidEmail(email)){
			errorMessage("Email is not valid");
			setNodeBorderRed(email);
		}else{
			email.style['box-shadow'] = '';
		}

		if(!name.value.length > 0){
			errorMessage("A name has not been entered")
			setNodeBorderRed(name);
		}else {
			email.style['box-shadow'] = '';
		}

		if (paymentMethod.value == 'credit card') {
			isValid(cc_num, (cc_num.value.length < 13 || cc_num.value.length > 16));
			isValid(zip, zip.value.length != 5);
			isValid(cvv, cvv.value.length != 3);
		}

	 	for (let i = 0; i < activityInputs.length; i++) {
			if(activityInputs[i].checked){
				activitiesInput = true;
				i = activityInputs.length-1;
			}
		}

		!activitiesInput ? activityLegend.style.color = 'red' : activityLegend.style.color = '#184f68';

		if(errorAlert != ''){
			alert(errorAlert += '.');
		}

		scroll(0,0);
	});
});
