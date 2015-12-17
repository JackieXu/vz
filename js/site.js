(function () {
    "use strict";

    var emailForms = document.querySelectorAll('.invite-form'),
        phoneScreens = document.querySelectorAll('.phone-image'),
        explanationCells = document.querySelectorAll('.explanation-cell'),
        explanationBars = document.querySelectorAll('.progress-bar'),
        explanationCellBars = document.querySelectorAll('.progress-bar-filled'),
        currentScreenIndex = 0,
        shareOverlay = document.querySelector('#share-overlay'),
        timer;

    document.querySelector('html').addEventListener('click', function () {
        shareOverlay.style.display = 'none';
    });

    shareOverlay.addEventListener('click', function (event) {
        event.stopPropagation();
    });

    [].forEach.call(emailForms, function (form) {
        form.addEventListener('submit', function (event) {
            event.stopPropagation();
            event.preventDefault();

            var xhr = new XMLHttpRequest();
            xhr.open('POST', 'http://av3.miwi.com/mailing-list/bcf991ea80', true);
            xhr.addEventListener('load', function () {
                shareOverlay.style.display = 'block';
            });
            xhr.send(new FormData(this));

            return false;
        }, false);
    });

    [].forEach.call(explanationCells, function (cell, index) {
        cell.addEventListener('click', function () {
            currentScreenIndex = index;
            [].forEach.call(explanationCellBars, function (bar, index) {
                bar.dataset.width = 0;
            });
            [].forEach.call(phoneScreens, function (screen, index) {
                screen.classList.toggle('visible', index === currentScreenIndex);
            });

            [].forEach.call(explanationCells, function (cell, index) {
                cell.classList.toggle('active', index === currentScreenIndex);
            });

            [].forEach.call(explanationBars, function (bar, index) {
                bar.classList.toggle('hidden', index !== currentScreenIndex);
                bar.classList.toggle('active', index === currentScreenIndex);
            });
            clearTimeout(timer);
            timer = renderScreens();
        }, false);
    });

    function renderScreens() {
        var currentCellBar = explanationCellBars[currentScreenIndex],
            width = parseInt(currentCellBar.dataset.width, 10);

        width = (width + 25) % 125;

        if (width === 0) {
            currentScreenIndex = (currentScreenIndex + 1) % 3;

            [].forEach.call(phoneScreens, function (screen, index) {
                screen.classList.toggle('visible', index === currentScreenIndex);
            });

            [].forEach.call(explanationCells, function (cell, index) {
                cell.classList.toggle('active', index === currentScreenIndex);
            });

            [].forEach.call(explanationBars, function (bar, index) {
                bar.classList.toggle('hidden', index !== currentScreenIndex);
                bar.classList.toggle('active', index === currentScreenIndex);
            });
        }

        currentCellBar.dataset.width = width;
        currentCellBar.style.width = width + '%';

        timer = setTimeout(renderScreens, 1000);

        return timer;
    }

    renderScreens();

    window.addEventListener('scroll', function () {
        if (window.pageYOffset > 0) {
            document.querySelector('#header').classList.toggle('black', true);
        } else {
            document.querySelector('#header').classList.remove('black');
        }
    }, false);
}());