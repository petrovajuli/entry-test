## 1 Broken page
This nice mosaic was totally broken, please fix it.

Исправлено:
- 99 стр. блок <div class="mosaic__tile"></div> перенесен в родительский класс mosaic
- 82 стр. убрано вращение
- 56 стр. position:relative перемещено в блок mosaic
- исменены значения background-position у всех mosaic__tile:nth-of-type

## 2 Maze
Help orange square get out of the frightening maze.

Unfortunately, the orange square doesn't know how to make moves up and left.
You have to teach it to do that.

Исправлено:
- созданы файлы для стилей и логики
main.js:
- 108 и 116 строки: добавлено смещение 
- добавлены функции stepper(190 стр), changeDir(211 стр), changeDirReversed(226 стр) для автоматического добавления шагов в массив steps. Теперь в функции plan(184 стр) можно задать только начальное направление 

## 3 Page from JPEG
We've lost sources of our main page, only one last screenshot was left.

Please help us to compose this web-page again.

- По макету сверстана страница с использованием сброса настройки стилей, очень упрощенной сетки и flexbox.

## 4 Algorithm in JS
Fibonacci has called. Seems he can’t recall his numbers, except for the first two: 1, 1.

Could you create .js file, that Fibonacci can copypaste in his browser console and get any Nth number by inputing the N into it.

- как указано в задание создан файл fibonacci.js в котором написан скрипт, выполняющий вычисление числа Фибоначчи по заданой позиции.
- свестана страница, с которой можно скопировать код в консоль браузера
