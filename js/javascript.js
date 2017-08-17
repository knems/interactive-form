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
	const $submitButton = $("[type='submit']");;

	const $colors_js_puns = $("#colors-js-puns");
	const $other_title = $("#other-title");

	const $creditCardPayment = $("#credit-card");
	const $paypalMessage = $("[id='paypal message']");
	const $bitcoinMessage = $("[id='bitcoin message']");

	var hideAndSetDefaults =(() => {
		name.select();
		$other_title.hide();
		$colors_js_puns.hide();
		paymentMethod.value = "credit card";
		$paypalMessage.hide();
		$bitcoinMessage.hide();
	})();

	userTitle.addEventListener("change", showTitleIfOtherSelected);
	tShirtDesignSelect.addEventListener("change", changeTShirts);
	activities.addEventListener("change", checkboxCompatability);
	paymentMethod.addEventListener("change", changePaymentMethod);
	email.addEventListener("keyup", emailLiveValidCheck);
	$submitButton.on('click', checkIfValidForm);

	function showTitleIfOtherSelected(e) {
		let selected = e.target.value;
		selected == "other" ? $other_title.show() : $other_title.hide();
	}

	function changeTShirts (e) {
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
	}

	let activitiesCostTotal = 0;
	function checkboxCompatability (e) {
		let checkboxChecked = e.target.checked;
		let checkboxName = e.target.name;
		let parentLabelNode = e.target.parentNode;

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
		function enableBox (i, price) {
			let conflictingCheckbox = checkbox[i];
			priceAdjustment(price);
			checkBoxChangeColor();
			checkboxChecked ? conflictingCheckbox.parentNode.style.color = 'red' : conflictingCheckbox.parentNode.style.color = '';
			checkboxChecked ? conflictingCheckbox.disabled = true : conflictingCheckbox.disabled = false;
		}
		function checkBoxChangeColor () {
			checkboxChecked ? parentLabelNode.style.color = 'green' : parentLabelNode.style.color = '#000';
		}
		function priceAdjustment (price) {
			return checkboxChecked ? activitiesCostTotal += price : activitiesCostTotal -= price;
		}
		activitiesCostTotalElement.innerHTML = 'Total: $';
		activitiesCostTotalElement.innerHTML += activitiesCostTotal.toString();
	}

	function changePaymentMethod (e) {
		let selected = e.target.value;

		selected == "credit card" ? $creditCardPayment.show() : $creditCardPayment.hide();
		selected == "paypal" ? $paypalMessage.show() : $paypalMessage.hide();
		selected == "bitcoin" ? $bitcoinMessage.show() : $bitcoinMessage.hide();
	}

	function emailLiveValidCheck () {
		isNotValidEmail(email) ? setNodeBorderRed(email) : email.style['box-shadow'] = '';
	}

	let letters = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	let formIsValid = false;
	let msg = '';
	let activitiesInput = false;
	let activityLegend = activities.children[0];
	let numbers = /^[0-9]+$/;
	let errorAlert = '';

	function errorMessage (msg) {
		if(errorAlert.length != 0){
			errorAlert += ', ';
		}
		errorAlert += msg;}

	function setNodeBorderRed (node) {
		node.style['box-shadow'] = '0 0 5px 2px red';
		return false;}

	function isNameValid () {
		if(!name.value.length > 0){
			errorMessage("A name has not been entered");
			setNodeBorderRed(name);
			return false;
		}else {
			name.style['box-shadow'] = '';
			return true;}}

	function isNotValidEmail (node) { return !letters.test(node.value) }

	function isEmailValid () {
		if(isNotValidEmail(email)){
			errorMessage("Email is not valid");
			setNodeBorderRed(email);
			return false;
		}else{
			email.style['box-shadow'] = '';
			return true;
		}}

	function isValidNumber (node) { return node.value.match(numbers); }

	function isValid (x, condition) {
		if(isValidNumber(x) && !condition){
			x.style['box-shadow'] = '';
			return true;
		}else{
			x.style['box-shadow'] = '0 0 5px 2px red';
			return false;
		}}

	function isPaymentMethodValid () {
		if (paymentMethod.value == 'credit card') {
			let boolCcNum = isValid(cc_num, (cc_num.value.length < 13 || cc_num.value.length > 16));
			let boolZip = isValid(zip, zip.value.length != 5);
			let boolCvv = isValid(cvv, cvv.value.length != 3);

			return (boolCcNum && boolZip && boolCvv);
		}else {
			return true;}}

	function hasAnActivityBeenSelected () {
		for (let i = 0; i < activityInputs.length; i++) {
			if(activityInputs[i].checked){
				activitiesInput = true;
				i = activityInputs.length-1;}}

		!activitiesInput ? activityLegend.style.color = 'red' : activityLegend.style.color = '#184f68';
		return activitiesInput;
	}

	function checkIfValidForm(e) {
		errorAlert = '';

		let boolIsNameValid = isNameValid();
		let boolIsEmailValid = isEmailValid();
		let boolhasAnActivityBeenSelected = hasAnActivityBeenSelected();
		let boolIsPaymentMethodValid = isPaymentMethodValid();

		if( boolIsNameValid && boolIsEmailValid && boolhasAnActivityBeenSelected && boolIsPaymentMethodValid ){
			return alert('Form is valid, information sent');
		}else{
			e.preventDefault();
			if(errorAlert != ''){
				return alert(errorAlert += '.');
			}
		}
		scroll(0,0);}});
