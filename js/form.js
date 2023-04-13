import {isEscapeKey} from './util.js';
import {showSuccessMessage, showUploadErrorMessage} from './messages.js';

const MAX_LENGTH_DESCRIPTION = 140;
const MAX_HASHTAG_FORM = 5;
// Регулярка
const VALID_SYMBOLS = /^#[a-zа-яё0-9]{1,19}$/i;
const SEND_URL = 'https://28.javascript.pages.academy/kekstagram';

const fileField = document.querySelector('#upload-file');
const overlayElement = document.querySelector('.img-upload__overlay');
const body = document.querySelector('body');
const closelButton = document.querySelector('#upload-cancel');
const form = document.querySelector('.img-upload__form');
const hashtagField = document.querySelector('.text__hashtags');
const commentField = document.querySelector('.text__description');

//подключение формы  к Pristine
const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--invalid',
  successClass: 'img-upload__field-wrapper-valid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'img-upload__field-wrapper-error'
});

// Проверка длины комментария к фото
const checkLengthDescriptionPhoto = (text) => text.length <= MAX_LENGTH_DESCRIPTION;

// Функция показа формы
const showForm = () => {
  overlayElement.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onEscKeyDown);
};

// Функция скрытия формы
const hideForm = () => {
  // Сброс всех полей формы
  form.reset();
  // Сброс pristine
  pristine.reset();
  overlayElement.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onEscKeyDown);
};


// Обработчик для показа формы
const onFileInputChange = () => {
  showForm();
};

// Обработчик для скрытия формы по кнопке
const onCloseButtonClick = () => {
  hideForm ();
};

// Проверка на отсутствие фокуса на поле комментария или хештега
const isFieldFocused = () => document.activeElement === hashtagField || document.activeElement === commentField;

// Обработчик скрытия окна при нажатии Esc
function onEscKeyDown(evt) {
  // Проверка на закрытие модалки
  if (document.body.lastChild.classList && document.body.lastChild.classList.contains('error')) {
    return;
  }

  if (isEscapeKey(evt) && !isFieldFocused()) {
    evt.preventDefault();
    hideForm();
  }
}

// Функция для валидатора - проверка тегов на валидность значений (будем проверять каждый элемент
// нового массива)
const isValidTag = (tag) => VALID_SYMBOLS.test(tag);

// Функция для вадидатора - проверка тегов на кол-во
const hasValidCount = (tags) =>tags.length <= MAX_HASHTAG_FORM;

// Функция для вадидатора - проверка тегов на уникальность
const hashUniqueTags = (tags) => {
  // Создаем новый массив, преобразуя все теги в нижний регистр
  const lowerCaseTags = tags.map((tag) => tag.toLowerCase());
  // Возвращаем булево значение true, если длина нового массива равна size (кол-ву элементов)
  // нового объекта Set (может содержать ТОЛЬКО уникальные значения)
  return lowerCaseTags.length === new Set(lowerCaseTags).size;
};

const validateTags = (value) => {
  // Берем значение, убираем из него пробелы вначале и в конце - .trim,
  // создаем массив, разделяя строки по пробелу .split(' ')
  // создаем новый массив с элементами, прошедшими проверку на наличие длины (отсутствие пустоты) .filter
  const tags = value.trim().split(' ').filter((tag) => tag.trim().length);
  // возвращаем булево значение true, если все проверки пройдены (false - если нет)
  return hasValidCount(tags) && hashUniqueTags(tags) && tags.every(isValidTag);
};

// Валидатор на хэштеги
pristine.addValidator(
  // Поле с хэштегами
  hashtagField,
  // Функция валидации
  validateTags,
  // Текст ошибки
  'Образцы хэштегов: #sun #солнце. Не более 5-ти хэштегов'
);

// Валидатор на длину строки
pristine.addValidator(
  commentField,
  checkLengthDescriptionPhoto,
  'Максимум 140 символов'
);


// Функция для валидации и отправки формы
const onFormSubmit = (evt) => {
  // Отменяем отправку
  evt.preventDefault();
  // Функция для проверки валидности
  const isValid = pristine.validate();
  // Если форма валидна
  if(isValid) {
    // Собираем данные
    const formData = new FormData(evt.target);
    // Отправляем на сервер
    fetch(
      SEND_URL,
      {
        method: 'POST',
        body: formData,
      },
    ) .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(`${response.status} ${response.statusText}`);
    })
      .then(() => {
        // Если все ок - сообщение об успехе и закрытие формы
        showSuccessMessage();
        hideForm();
      })
      .catch(() => {
        // При ошибке показываем сообщение ошибки
        showUploadErrorMessage();
      });
  }
};

// Слушатель для изменения в форме - показа окна
fileField.addEventListener('change', onFileInputChange);
// Слушатель для кнопки закрытия
closelButton.addEventListener('click', onCloseButtonClick);
// Слушатель для отправки формы
form.addEventListener('submit', onFormSubmit);
