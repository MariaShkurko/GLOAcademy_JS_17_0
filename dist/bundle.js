/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _modules_countTimer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/countTimer */ \"./src/modules/countTimer.js\");\n/* harmony import */ var _modules_smoothScrolling__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/smoothScrolling */ \"./src/modules/smoothScrolling.js\");\n/* harmony import */ var _modules_toggleMenu__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/toggleMenu */ \"./src/modules/toggleMenu.js\");\n/* harmony import */ var _modules_togglePopUp__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/togglePopUp */ \"./src/modules/togglePopUp.js\");\n/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/tabs */ \"./src/modules/tabs.js\");\n/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/slider */ \"./src/modules/slider.js\");\n/* harmony import */ var _modules_validation__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/validation */ \"./src/modules/validation.js\");\n/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./modules/calc */ \"./src/modules/calc.js\");\n/* harmony import */ var _modules_sendForm__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./modules/sendForm */ \"./src/modules/sendForm.js\");\n\n\n\n\n\n\n\n\n // Timer\n\n(0,_modules_countTimer__WEBPACK_IMPORTED_MODULE_0__.default)('20 march 2021'); // Validation\n\nvar errorList = (0,_modules_validation__WEBPACK_IMPORTED_MODULE_6__.default)(); // Menu\n\n(0,_modules_toggleMenu__WEBPACK_IMPORTED_MODULE_2__.default)(); // popup\n\n(0,_modules_togglePopUp__WEBPACK_IMPORTED_MODULE_3__.default)(); // tabs\n\n(0,_modules_tabs__WEBPACK_IMPORTED_MODULE_4__.default)(); // Slider\n\n(0,_modules_slider__WEBPACK_IMPORTED_MODULE_5__.default)(); // Calculate\n\n(0,_modules_calc__WEBPACK_IMPORTED_MODULE_7__.default)(100); // send-ajax-form\n\n(0,_modules_sendForm__WEBPACK_IMPORTED_MODULE_8__.default)(errorList); // smooth scrolling on main btn\n\nvar btnMain = document.querySelector('main>a');\nbtnMain.addEventListener('click', function (event) {\n  event.preventDefault();\n  (0,_modules_smoothScrolling__WEBPACK_IMPORTED_MODULE_1__.default)(btnMain);\n}); // Command photo\n\nvar commandBlock = document.querySelector('.command > .container > .row');\ncommandBlock.addEventListener('mouseover', function (event) {\n  var target = event.target;\n\n  if (target.matches('.command__photo')) {\n    target.dataset.src = target.getAttribute(\"src\");\n    target.src = target.dataset.img;\n  }\n});\ncommandBlock.addEventListener('mouseout', function (event) {\n  var target = event.target;\n\n  if (target.matches('.command__photo')) {\n    target.src = target.dataset.src;\n    target.dataset.src = '';\n  }\n});\n\n//# sourceURL=webpack://3dglo/./src/index.js?");

/***/ }),

/***/ "./src/modules/calc.js":
/*!*****************************!*\
  !*** ./src/modules/calc.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nvar calc = function calc() {\n  var price = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 100;\n  var calcBlock = document.querySelector('.calc-block'),\n      calcType = calcBlock.querySelector('.calc-type'),\n      calcSquare = calcBlock.querySelector('.calc-square'),\n      calcCount = calcBlock.querySelector('.calc-count'),\n      calcDay = calcBlock.querySelector('.calc-day'),\n      totalValue = document.getElementById('total');\n\n  var countSum = function countSum() {\n    var total = 0,\n        countValue = 1,\n        dayValue = 1;\n    var typeValue = calcType.options[calcType.selectedIndex].value,\n        squareValue = +calcSquare.value;\n\n    if (calcCount.value && calcCount.value > 1) {\n      countValue += (calcCount.value - 1) / 10;\n    }\n\n    if (calcDay.value && calcDay.value < 5) {\n      dayValue *= 2;\n    } else if (calcDay.value && calcDay.value < 10) {\n      dayValue *= 1.5;\n    }\n\n    if (typeValue && squareValue) {\n      total = price * typeValue * squareValue * countValue * dayValue;\n    }\n\n    totalValue.textContent = Math.ceil(total);\n  };\n\n  calcBlock.addEventListener('change', function (event) {\n    var target = event.target;\n\n    if (target.matches('select') || target.matches('input')) {\n      countSum();\n    }\n  });\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calc);\n\n//# sourceURL=webpack://3dglo/./src/modules/calc.js?");

/***/ }),

/***/ "./src/modules/countTimer.js":
/*!***********************************!*\
  !*** ./src/modules/countTimer.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nvar countTimer = function countTimer(deadline) {\n  var timerHours = document.querySelector('#timer-hours'),\n      timerMinutes = document.querySelector('#timer-minutes'),\n      timerSeconds = document.querySelector('#timer-seconds');\n\n  var getTimeRemaining = function getTimeRemaining() {\n    var dateStop = new Date(deadline).getTime(),\n        dateNow = new Date().getTime(),\n        timeRemaining = (dateStop - dateNow) / 1000,\n        seconds = Math.floor(timeRemaining % 60),\n        minutes = Math.floor(timeRemaining / 60 % 60),\n        hours = Math.floor(timeRemaining / 3600);\n    return {\n      timeRemaining: timeRemaining,\n      hours: hours,\n      minutes: minutes,\n      seconds: seconds\n    };\n  };\n\n  var updateClock = function updateClock() {\n    var timer = getTimeRemaining();\n\n    var formatNumbers = function formatNumbers(number) {\n      if (String(number).length < 2) {\n        return '0' + String(number);\n      }\n\n      return String(number);\n    };\n\n    timerHours.textContent = formatNumbers(timer.hours);\n    timerMinutes.textContent = formatNumbers(timer.minutes);\n    timerSeconds.textContent = formatNumbers(timer.seconds);\n\n    if (timer.timeRemaining < 1) {\n      timerHours.textContent = '00';\n      timerMinutes.textContent = '00';\n      timerSeconds.textContent = '00';\n      return 0;\n    }\n  };\n\n  updateClock();\n  var idInterval = setInterval(function () {\n    var res = updateClock();\n\n    if (res === 0) {\n      clearInterval(idInterval);\n    }\n  }, 1000);\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (countTimer);\n\n//# sourceURL=webpack://3dglo/./src/modules/countTimer.js?");

/***/ }),

/***/ "./src/modules/sendForm.js":
/*!*********************************!*\
  !*** ./src/modules/sendForm.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nvar sendForm = function sendForm(errorValidate) {\n  var errorMessage = 'Что-то пошло не так...',\n      successMessage = 'Спасибо! Мы скоро с вами свяжемся!',\n      incorrectDataMessage = 'Введены некоректные данные',\n      loadSpin = document.createElement('div'),\n      loadSpinChild1 = document.createElement('div'),\n      loadSpinChild2 = document.createElement('div');\n  loadSpin.className = 'sk-wandering-cubes';\n  loadSpinChild1.className = 'sk-cube';\n  loadSpinChild2.className = 'sk-cube';\n  loadSpinChild1.classList.add('sk-cube-1');\n  loadSpinChild2.classList.add('sk-cube-2');\n  loadSpin.insertAdjacentElement('afterbegin', loadSpinChild2);\n  loadSpin.insertAdjacentElement('afterbegin', loadSpinChild1);\n  var form1 = document.getElementById('form1'),\n      form2 = document.getElementById('form2'),\n      form3 = document.getElementById('form3'),\n      statusMessage = document.createElement('div');\n  statusMessage.classList.add('status-message');\n\n  var postData = function postData(body) {\n    return fetch('./server.php', {\n      method: 'POST',\n      headers: {\n        'Content-Type': 'application/json'\n      },\n      body: JSON.stringify(body)\n    });\n  };\n\n  var prepareData = function prepareData(event, form) {\n    event.preventDefault();\n    form.appendChild(statusMessage);\n\n    if (errorValidate.size) {\n      statusMessage.textContent = incorrectDataMessage;\n      return;\n    }\n\n    statusMessage.textContent = '';\n    statusMessage.insertAdjacentElement('afterbegin', loadSpin);\n    var body = {},\n        formData = new FormData(form);\n    formData.forEach(function (val, key) {\n      body[key] = val;\n    });\n    postData(body).then(function (responce) {\n      if (responce.status !== 200) {\n        throw new Error('status network not 200');\n      }\n\n      statusMessage.textContent = successMessage;\n      form.querySelectorAll('input').forEach(function (item) {\n        item.value = '';\n      });\n    })[\"catch\"](function (error) {\n      statusMessage.textContent = errorMessage;\n      console.error(error);\n    });\n  };\n\n  form1.addEventListener('submit', function (event) {\n    prepareData(event, form1);\n  });\n  form2.addEventListener('submit', function (event) {\n    prepareData(event, form2);\n  });\n  form3.addEventListener('submit', function (event) {\n    prepareData(event, form3);\n  });\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (sendForm);\n\n//# sourceURL=webpack://3dglo/./src/modules/sendForm.js?");

/***/ }),

/***/ "./src/modules/slider.js":
/*!*******************************!*\
  !*** ./src/modules/slider.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nvar slider = function slider() {\n  var slider = document.querySelector('.portfolio-content'),\n      slides = slider.querySelectorAll('.portfolio-item'),\n      portfolioDots = slider.querySelector('.portfolio-dots');\n\n  for (var i = 0; i < slides.length; i++) {\n    var newDot = document.createElement('li');\n    newDot.classList.add('dot');\n\n    if (i === 0) {\n      newDot.classList.add('dot-active');\n    }\n\n    portfolioDots.append(newDot);\n  }\n\n  var dot = portfolioDots.querySelectorAll('.dot');\n  var currentSlide = 0,\n      interval;\n\n  var prevSlide = function prevSlide(elem, index, strClass) {\n    elem[index].classList.remove(strClass);\n  };\n\n  var nextSlide = function nextSlide(elem, index, strClass) {\n    elem[index].classList.add(strClass);\n  };\n\n  var autoPlaySlide = function autoPlaySlide() {\n    prevSlide(slides, currentSlide, 'portfolio-item-active');\n    prevSlide(dot, currentSlide, 'dot-active');\n    currentSlide++;\n\n    if (currentSlide >= slides.length) {\n      currentSlide = 0;\n    }\n\n    nextSlide(slides, currentSlide, 'portfolio-item-active');\n    nextSlide(dot, currentSlide, 'dot-active');\n  };\n\n  var startSlide = function startSlide() {\n    var time = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 3000;\n    interval = setInterval(autoPlaySlide, time);\n  };\n\n  var stopSlide = function stopSlide() {\n    clearInterval(interval);\n  };\n\n  slider.addEventListener('click', function (event) {\n    event.preventDefault();\n    var target = event.target;\n\n    if (!target.matches('.portfolio-btn, .dot')) {\n      return;\n    }\n\n    prevSlide(slides, currentSlide, 'portfolio-item-active');\n    prevSlide(dot, currentSlide, 'dot-active');\n\n    if (target.matches('#arrow-left')) {\n      currentSlide--;\n    } else if (target.matches('#arrow-right')) {\n      currentSlide++;\n    } else if (target.matches('.dot')) {\n      dot.forEach(function (elem, index) {\n        if (elem === target) {\n          currentSlide = index;\n        }\n      });\n    }\n\n    if (currentSlide >= slides.length) currentSlide = 0;\n    if (currentSlide < 0) currentSlide = slides.length - 1;\n    nextSlide(slides, currentSlide, 'portfolio-item-active');\n    nextSlide(dot, currentSlide, 'dot-active');\n  });\n  slider.addEventListener('mouseover', function (event) {\n    if (event.target.matches('.portfolio-btn, .dot')) stopSlide();\n  });\n  slider.addEventListener('mouseout', function (event) {\n    if (event.target.matches('.portfolio-btn, .dot')) startSlide(5000);\n  });\n  startSlide(5000);\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);\n\n//# sourceURL=webpack://3dglo/./src/modules/slider.js?");

/***/ }),

/***/ "./src/modules/smoothScrolling.js":
/*!****************************************!*\
  !*** ./src/modules/smoothScrolling.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nvar smoothScrolling = function smoothScrolling(anchor) {\n  var blockID = anchor.getAttribute('href');\n  document.querySelector(blockID).scrollIntoView({\n    behavior: 'smooth',\n    block: 'start'\n  });\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (smoothScrolling);\n\n//# sourceURL=webpack://3dglo/./src/modules/smoothScrolling.js?");

/***/ }),

/***/ "./src/modules/tabs.js":
/*!*****************************!*\
  !*** ./src/modules/tabs.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nvar tabs = function tabs() {\n  var tabHeader = document.querySelector('.service-header'),\n      tab = tabHeader.querySelectorAll('.service-header-tab'),\n      tabContent = document.querySelectorAll('.service-tab');\n\n  var toggleTabContent = function toggleTabContent(index) {\n    for (var i = 0; i < tabContent.length; i++) {\n      if (index === i) {\n        tab[i].classList.add('active');\n        tabContent[i].classList.remove('d-none');\n      } else {\n        tab[i].classList.remove('active');\n        tabContent[i].classList.add('d-none');\n      }\n    }\n  };\n\n  tabHeader.addEventListener('click', function (event) {\n    var target = event.target.closest('.service-header-tab');\n\n    if (target) {\n      tab.forEach(function (item, i) {\n        if (item === target) {\n          toggleTabContent(i);\n        }\n      });\n    }\n  });\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);\n\n//# sourceURL=webpack://3dglo/./src/modules/tabs.js?");

/***/ }),

/***/ "./src/modules/toggleMenu.js":
/*!***********************************!*\
  !*** ./src/modules/toggleMenu.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _smoothScrolling__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./smoothScrolling */ \"./src/modules/smoothScrolling.js\");\n\n\nvar toggleMenu = function toggleMenu() {\n  var btnMenu = document.querySelector('.menu'),\n      menu = document.querySelector('menu');\n\n  var handlerMenu = function handlerMenu() {\n    menu.classList.toggle('active-menu');\n  };\n\n  btnMenu.addEventListener('click', handlerMenu);\n  menu.addEventListener('click', function (event) {\n    var target = event.target;\n\n    if (target.classList.contains('close-btn')) {\n      handlerMenu();\n    } else if (target.nodeName === 'A') {\n      event.preventDefault();\n      handlerMenu();\n      (0,_smoothScrolling__WEBPACK_IMPORTED_MODULE_0__.default)(target);\n    }\n  });\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (toggleMenu);\n\n//# sourceURL=webpack://3dglo/./src/modules/toggleMenu.js?");

/***/ }),

/***/ "./src/modules/togglePopUp.js":
/*!************************************!*\
  !*** ./src/modules/togglePopUp.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nvar togglePopUp = function togglePopUp() {\n  var popup = document.querySelector('.popup'),\n      popupBtn = document.querySelectorAll('.popup-btn');\n  var count = 0,\n      animationInterval;\n\n  var animationPopUp = function animationPopUp() {\n    animationInterval = requestAnimationFrame(animationPopUp);\n    count += 0.05;\n    popup.style.opacity = count;\n\n    if (popup.style.opacity === \"1\") {\n      cancelAnimationFrame(animationInterval);\n      count = 0;\n    }\n  };\n\n  popupBtn.forEach(function (item) {\n    return item.addEventListener('click', function () {\n      if (screen.width < 768) {\n        popup.style.display = 'block';\n      } else {\n        popup.style.opacity = 0;\n        popup.style.display = 'block';\n        animationPopUp();\n      }\n    });\n  });\n  popup.addEventListener('click', function (event) {\n    var target = event.target;\n\n    if (target.classList.contains('popup-close')) {\n      popup.style.opacity = '';\n      popup.style.display = '';\n    } else {\n      target = target.closest('.popup-content');\n\n      if (!target) {\n        popup.style.opacity = '';\n        popup.style.display = '';\n      }\n    }\n  });\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (togglePopUp);\n\n//# sourceURL=webpack://3dglo/./src/modules/togglePopUp.js?");

/***/ }),

/***/ "./src/modules/validation.js":
/*!***********************************!*\
  !*** ./src/modules/validation.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nvar validation = function validation() {\n  var calcBlock = document.querySelector('.calc-block'),\n      mainForm = document.getElementById('form1'),\n      mainFormName = document.getElementById('form1-name'),\n      mainFormEmail = document.getElementById('form1-email'),\n      mainFormPhone = document.getElementById('form1-phone'),\n      connectForm = document.getElementById('form2'),\n      connectFormName = document.getElementById('form2-name'),\n      connectFormEmail = document.getElementById('form2-email'),\n      connectFormPhone = document.getElementById('form2-phone'),\n      connectFormMessage = document.getElementById('form2-message'),\n      popUpForm = document.getElementById('form3'),\n      popUpFormName = document.getElementById('form3-name'),\n      popUpFormEmail = document.getElementById('form3-email'),\n      popUpFormPhone = document.getElementById('form3-phone');\n  var errorValidate = new Set();\n\n  var validatePhone = function validatePhone(event) {\n    var target = event.target;\n    target.value = target.value.replace(/^[^0-9+]*/g, '').replace(/\\D*$/g, '').replace(/^\\++/g, '+');\n\n    if (!target.value.length) {\n      errorValidate.add(target.id);\n    } else if ((target.value.length > 6 || target.value.length < 13) && target.value.search(/^(\\+7|8)\\d{5,10}$/) === -1) {\n      target.style.border = '2px solid red';\n      errorValidate.add(target.id);\n    } else {\n      target.style.border = '';\n      errorValidate[\"delete\"](target.id);\n    }\n  };\n\n  var validateName = function validateName(event) {\n    var target = event.target;\n    target.value = target.value.trim().replace(/ +/g, ' ').split(' ').map(function (word) {\n      return word.slice(0, 1).toUpperCase() + word.slice(1).toLowerCase();\n    }).join(' ');\n\n    if (target.value.length < 2) {\n      target.style.border = '2px solid red';\n      errorValidate.add(target.id);\n    } else if (!target.value) {\n      errorValidate.add(target.id);\n    } else {\n      target.style.border = '';\n      errorValidate[\"delete\"](target.id);\n    }\n  };\n\n  var validateEmail = function validateEmail(event) {\n    var target = event.target;\n    target.value = target.value.toLowerCase().replace(/^-*/g, '').replace(/\\W*$/g, '');\n\n    if (target.value && target.value.search(/\\w+@\\w+\\.\\w{2,3}/) === -1) {\n      target.style.border = '2px solid red';\n      errorValidate.add(target.id);\n    } else if (!target.value) {\n      errorValidate.add(target.id);\n    } else {\n      target.style.border = '';\n      errorValidate[\"delete\"](target.id);\n    }\n  };\n\n  calcBlock.addEventListener('input', function (event) {\n    var target = event.target;\n\n    if (target.matches('.calc-square') || target.matches('.calc-count') || target.matches('.calc-day')) {\n      target.value = target.value.replace(/\\D/g, '');\n    }\n  });\n  mainForm.addEventListener('input', function (event) {\n    var target = event.target;\n\n    if (target.matches('#form1-name')) {\n      target.value = target.value.replace(/[^а-яё ]/gi, '');\n    } else if (target.matches('#form1-email')) {\n      target.value = target.value.replace(/[^a-z@_!~'-.*]/gi, '');\n    } else if (target.matches('#form1-phone')) {\n      target.value = target.value.replace(/[^0-9+]/gi, '');\n    }\n  });\n  mainFormName.addEventListener('blur', function (event) {\n    validateName(event);\n  });\n  mainFormEmail.addEventListener('blur', function (event) {\n    validateEmail(event);\n  });\n  mainFormPhone.addEventListener('blur', function (event) {\n    validatePhone(event);\n  });\n  connectForm.addEventListener('input', function (event) {\n    var target = event.target;\n\n    if (target.matches('#form2-name')) {\n      target.value = target.value.replace(/[^а-яё ]/gi, '');\n    } else if (target.matches('#form2-message')) {\n      target.value = target.value.replace(/[^а-яё0-9.,\\-!?:;'`\"()@ ]/gi, '');\n    } else if (target.matches('#form2-email')) {\n      target.value = target.value.replace(/[^a-z@_!~'\\-.*]/gi, '');\n    } else if (target.matches('#form2-phone')) {\n      target.value = target.value.replace(/[^0-9+]/gi, '');\n    }\n  });\n  connectFormName.addEventListener('blur', function (event) {\n    validateName(event);\n  });\n  connectFormEmail.addEventListener('blur', function (event) {\n    validateEmail(event);\n  });\n  connectFormPhone.addEventListener('blur', function (event) {\n    validatePhone(event);\n  });\n  connectFormMessage.addEventListener('blur', function (event) {\n    var target = event.target;\n    target.value = target.value.trim().replace(/^-*/g, '').replace(/-*$/g, '').replace(/-+/g, '-').replace(/ +/g, ' ');\n  });\n  popUpForm.addEventListener('input', function (event) {\n    var target = event.target;\n\n    if (target.matches('#form3-name')) {\n      target.value = target.value.replace(/[^а-яё ]/gi, '');\n    } else if (target.matches('#form3-email')) {\n      target.value = target.value.replace(/[^a-z@_!~'-.*]/gi, '');\n    } else if (target.matches('#form3-phone')) {\n      target.value = target.value.replace(/[^0-9+]/gi, '');\n    }\n  });\n  popUpFormName.addEventListener('blur', function (event) {\n    validateName(event);\n  });\n  popUpFormEmail.addEventListener('blur', function (event) {\n    validateEmail(event);\n  });\n  popUpFormPhone.addEventListener('blur', function (event) {\n    validatePhone(event);\n  });\n  return errorValidate;\n};\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (validation);\n\n//# sourceURL=webpack://3dglo/./src/modules/validation.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;