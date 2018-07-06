var x = 1, y = 1;

function moveItem(sign, direction, click, empty, pos, emptyPos) {
    if (direction == 'x') {
        click.animate({
            left: sign + '=' + $('#origin')[0].naturalWidth / x
        }, 'fast');
        empty.animate({
            left: (sign == '+' ? '-' : '+') + '=' + $('#origin')[0].naturalWidth / x
        }, 'fast');
    } else if (direction == 'y') {
        click.animate({
            top: sign + '=' + $('#origin')[0].naturalHeight / y
        }, 'fast');
        empty.animate({
            top: (sign == '+' ? '-' : '+') + '=' + $('#origin')[0].naturalHeight / y
        }, 'fast');
    }
    click.data(direction, emptyPos);
    empty.data(direction, pos);
}

function move(e) {
    var
        X = parseInt($(this).find('img').data('x')),
        Y = parseInt($(this).find('img').data('y')),
        emptyX = parseInt($('.bord img:last').data('x')),
        emptyY = parseInt($('.bord img:last').data('y'));
    switch ((emptyX - X) + ' ' + (emptyY - Y)) {
        case 1 + ' ' + 0:
            moveItem('+', 'x', $(this).find('img'), $('.bord img:last'), X, emptyX);
            break;
        case -1 + ' ' + 0:
            moveItem('-', 'x', $(this).find('img'), $('.bord img:last'), X, emptyX);
            break;
        case 0 + ' ' + 1:
            moveItem('+', 'y', $(this).find('img'), $('.bord img:last'), Y, emptyY);
            break;
        case 0 + ' ' + -1:
            moveItem('-', 'y', $(this).find('img'), $('.bord img:last'), Y, emptyY);
            break;
    }
}

function setchange() {
    for (var yi = 0; yi < y; yi++) {
        $('.bord').append(document.createElement('div'));
        var div = $('.bord > div:last');
        for (var xi = 0; xi < x; xi++) {
            div.append(document.createElement('a'));
            var a = div.find('a:last');
            a.attr('href', '#');
            a.append(document.createElement('img'));
            var img = div.find('img:last');
            if (y !== yi + 1 || x !== xi + 1) {
                img[0].src = $('#origin')[0].src;
                var objx = '-' + $('#origin')[0].naturalWidth / x * xi + 'px';
                var objy = '-' + $('#origin')[0].naturalHeight / y * yi + 'px';
                var obj_pos = objx + ' ' + objy;
                img.css('object-position', obj_pos);
            }
        }
    }
    $('.bord img').css('width', $('#origin')[0].naturalWidth / x + 'px');
    $('.bord img').css('height', $('#origin')[0].naturalHeight / y + 'px');
    $('.bord a').on('click', move);
}

function posx(changex) {
    if (changex < 3) {
        x = 3;
    } else if (changex > 15) {
        x = 15;
    } else if (!isNaN(changex)) {
        x = changex;
    }
    $('.bord').html('');
    setchange();
}

function posy(changey) {
    if (changey < 3) {
        y = 3;
    } else if (changey > 15) {
        y = 15;
    } else if (!isNaN(changey)) {
        y = changey;
    }
    $('.bord').html('');
    setchange();
}

$('#posx').on('keyup', function (e) {
    posx(parseInt($('#posx').text()));
});

$('#posy').on('keyup', function (e) {
    posy(parseInt($('#posy').text()));
});

$('#go').on('click', function (e) {
    var arr = function () {
        var arr = [];
        for (var i = 0; i < x * y; i++) {
            arr[i] = i;
        }
        arr.sort(function (a, b) {
            return Math.random() - 0.5;
        });
        return arr;
    }();
    arr.forEach(function (value, index) {
            var
                X = index % x,
                Y = parseInt(index / x),
                invertX = value % x,
                invertY = parseInt(value / x),
                invert = $('.bord img').eq((invertY * x) + invertX);
            $('.bord img').eq(index).animate({
                top: $('#origin')[0].naturalHeight / y * (invertY - Y),
                left: $('#origin')[0].naturalWidth / x * (invertX - X)
            }, 1000);
            $('.bord img').eq(index).data('x', invertX);
            $('.bord img').eq(index).data('y', invertY);
        }
    );
});

$('.bord').css('max-width', $('#origin')[0].naturalWidth + 10 + 'px');
posx(parseInt($('#posx').text()));
posy(parseInt($('#posy').text()));