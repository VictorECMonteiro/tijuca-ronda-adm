function writeCookie(chave, valor, validade) {
  const d = new Date();
  d.setTime(d.getTime() + (validade*24*60*60*1000));
  let expires = "expires="+ d.toUTCString();
  document.cookie = chave + "=" + valor + ";" + expires + ";path=/";
}

export default writeCookie 