import * as moment from "moment";

export const baseImagePrefix = 'assets/images/';
export const baseAudioPrefix = 'assets/audio/';
export const baseVideoPrefix = 'assets/video/';

export const splitCamelCase = (camelCase) => {
  return (camelCase.split(/(?=[A-Z])/).join(' '));
};

export const titlecase = (value) => {
  return value.toLowerCase().split(' ').map((word) => {
    return (word.charAt(0).toUpperCase() + word.slice(1));
  }).join(' ');
};

export const charCount = (str: string, chr: string) => {
  let result = 0;
  for (let c of str) {
    if (c == chr) result++
  }
  return (result);
};

export const flatten = function (arr, result = []) {
  for (let i = 0, length = arr.length; i < length; i++) {
    const value = arr[i];
    if (Array.isArray(value)) {
      flatten(value, result);
    } else {
      result.push(value);
    }
  }
  return result;
};

export const authToken = function () {
  return (localStorage.getItem('auth_token'));
};

export const authTokenExpiresAt = function () {
  const expiration = localStorage.getItem("auth_token_expires_at");
  const expiresAt = new Date(expiration);
  return moment(expiresAt);
};

export const setAuthToken = function (data) {
  localStorage.setItem('auth_token', data.authToken);
  localStorage.setItem('auth_token_expires_at', data.expiresAt);
};

export const removeAuthToken = function () {
  localStorage.removeItem("auth_token");
  localStorage.removeItem("auth_token_expires_at");
};

export const times = function (n, f) {
  while (n--) f();
};

export const sound = function(src) {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  this.sound.style.display = "none";
  document.body.appendChild(this.sound);
  this.play = function(){
    this.sound.play();
  };
  this.stop = function(){
    this.sound.pause();
  }
};
