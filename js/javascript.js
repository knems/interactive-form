"use strict"

document.addEventListener('DOMContentLoaded', () => {

	const otherTitle = document.getElementById('other-title');
	const userTitle = document.getElementById('title');
	const tShirtDesignSelect = document.getElementById('design');
	const tShirtDesignColor = document.getElementById('color');

	const activities = document.getElementsByClassName('activities')[0];
	const checkbox = activities.getElementsByTagName('input');
	const activitiesCostTotalElement = document.getElementById('activitiesCostTotal');

	const paymentMethod = document.getElementById('payment');

	const activityInputs = activities.getElementsByTagName('input');
	const paymentOptions = paymentMethod.getElementsByTagName('option');

	const name = document.getElementById('name');
	const email = document.getElementById('mail');
	const cc_num = document.getElementById('cc-num');
	const zip = document.getElementById('zip');
	const cvv = document.getElementById('cvv');
	const submitButton = document.querySelectorAll('button[type=submit]')[0];

	const $colors_js_puns = $("#colors-js-puns");
	const $other_title = $("#other-title");

	const $creditCardPayment = $("#credit-card");
	const $paypalMessage = $("[id='paypal message']");
	const $bitcoinMessage = $("[id='bitcoin message']");

	document.getElementById('name').select();
	//set the default value of the payment selector to 'credit card'
	paymentMethod.value = "credit card";
	$paypalMessage.hide();
	$bitcoinMessage.hide();

	//hide t-shirt design colors
	//wait until shirt design is selected before displayed
	$colors_js_puns.hide();

	//no display until "other" job role is selected
	$other_title.hide();
	//Other job role open input when selected / deselected
	userTitle.addEventListener("change", (e) => {
		let selected = e.target.value;
		selected == "other" ? $other_title.show() : $other_title.hide();;
	});

	//T-shirt infor design/color match function
	tShirtDesignSelect.addEventListener("change", (e) => {
		let shirt = e.target.value;
		//making the color input visibile for selection
		$colors_js_puns.show();

		let showShirts = (x) => {
			$colors_js_puns.show();
		 	$("#color").html(x);
		};

		if(shirt == 'js puns'){
			showShirts("<option value=\"cornflowerblue\">Cornflower Blue (JS Puns shirt only)</option>" +
			"<option value=\"darkslategrey\">Dark Slate Grey (JS Puns shirt only)</option>" +
			"<option value=\"gold\">Gold (JS Puns shirt only)</option>");
		}else if (shirt == 'heart js') {
			showShirts("<option value=\"tomato\">Tomato (I &#9829; JS shirt only)</option>" +
			"<option value=\"steelblue\">Steel Blue (I &#9829; JS shirt only)</option>" +
			"<option value=\"dimgrey\">Dim Grey (I &#9829; JS shirt only)</option>");
		}else{
			$colors_js_puns.hide();
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

	paymentMethod.addEventListener("change", (e) => {
		let selected = e.target.value;

		selected == "credit card" ? $creditCardPayment.show() : $creditCardPayment.hide();
		selected == "paypal" ? $paypalMessage.show() : $paypalMessage.hide();
		selected == "bitcoin" ? $bitcoinMessage.show() : $bitcoinMessage.hide();
	});

	let letters = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

	let isNotValidEmail = (node) => !letters.test(node.value) ? true : false;

	let setNodeBorderRed = (node) => {
		return node.style['box-shadow'] = '0 0 5px 2px red';
	}

	email.addEventListener("keyup", (e) => {
		isNotValidEmail(email) ? setNodeBorderRed(email) : email.style['box-shadow'] = '';
	});

	submitButton.addEventListener('click', (e) => {
		//e.preventDefault();
		let msg = '';
		let activitiesInput = false;
		let activityLegend = activities.children[0];
		let numbers = /^[0-9]+$/;
		let errorAlert = '';

		//func to build error message, called when nodes do not meet validation
		let errorMessage = (msg) => {
			if(errorAlert.length != 0){
				errorAlert += ', ';
			}
			errorAlert += msg;
		}

		let isNotValidNumber = (node) => {
				return !node.value.match(numbers);
			}

		let isValid = (x, condition) => {
			(isNotValidNumber(x) || condition) ? setNodeBorderRed(x) : x.style['box-shadow'] = '';
		}

		//beginning of input checks
		if(isNotValidEmail(email)){
			errorMessage("Email is not valid");
			setNodeBorderRed(email);
		}else{
			email.style['box-shadow'] = '';
		}

		if(!name.value.length > 0){
			errorMessage("A name has not been entered");
			setNodeBorderRed(name);
		}else {
			name.style['box-shadow'] = '';
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

		//ended error message
		if(errorAlert != ''){
			alert(errorAlert += '.');
		}

		//returns view back to the very top of the doucment
		scroll(0,0);
	});
});
