(function(exports) {
  "use strict";
  
  function Medida(valor,tipo)  
  {
	this.valor = valor;
	this.tipo = tipo || "No type";
    /* tipo es opcional. Debería admitir  new Medida("45.2 Km") */
    /* ademas de new Medida(45.2, "Km") */
  }

	exports.Medida = Medida;
	
  function Temperatura(valor, tipo)
  {
	Medida.call(this);
    /* tipo es opcional. Debería admitir new Medida("45.2 F") */
  }

  Medida.prototype.setValor = function(valor){
    this.valor = valor;
  }

  Medida.prototype.setTipo = function(tipo){
    this.tipo = tipo;
  }

  Medida.prototype.getValor = function(){
    return this.valor;
  }

  Medida.prototype.getTipo = function(){
    return this.tipo;
  }
  
  function Celsius(valor)
  {
    this.valor = valor;
    function toFarenheit()
    {
      var resultado = (valor * 9/5) + 32;
      return resultado;
    }
    
    function toKelvin()
    {
      var resultado = (valor + 273.15);
      return resultado;
    }
  }
  
  function Farenheit(valor)
  {
    this.valor = valor;
    function toCelsius()
    {
      var resultado = (valor - 32) * 5/9;
      return resultado;
    }
    
    function toKelvin()
    {
      var resultado = (valor *5/9) + 459.67;
      return resultado;
    }
  }
  
  function Kelvin(valor)
  {
    this.valor = valor;
    function toCelsius()
    {
      var resultado = (valor -273.15);
      return resultado;
    }
    function toFarenheit()
    {
      var resultado = (valor - 459.67) * 9/5;
      return resultado;
    }
  }

  exports.Temperatura = Temperatura;
  exports.Celsius = Celsius;
  exports.Farenheit = Farenheit;

  exports.convertir = function() {
    var valor     = document.getElementById('convert').value;
    var elemento  = document.getElementById('converted');
    var tipo;
    var  aux;
    
    var nuevo = XRegExp('(?<val> [-+]?\d+(?:\.\d+)?\s* ) # val \n\
                          (?<tip>  [cCfFkK]           ) # tip \n\
                          (?<to>   ["to"]             ) # to \n\
                          (?<au>   [cCfFkK]           ) # au','x');
                          
    var match = XRegExp.exec(valor, nuevo);
       // regexp    = /^\s*([-+]?\d+(?:\.\d+)?(?:e[+-]?\d+)?)\s*([a-z,A-Z]+)\s*$/i,
       // valor = valor.match(regexp);
     console.log(match.val);
    if (valor) {
      valor = match.val;
      tipo = match.tip;
      aux = match.au;
      
      var numero = parseFloat(valor);
    
      
      
      console.log("Valor: " + numero + ", Tipo: " + tipo);
      
      switch (tipo) {
        case 'c':
          var celsius = new Celsius(numero);
          if (aux == 'f'){
            elemento.innerHTML = celsius.toFarenheit().toFixed(2) + " Farenheit";
          }
          else if (aux == 'k'){
            elemento.innerHTML = celsius.toKelvin().toFixed(2) + " Kelvin";
          }
          break;
        case 'f':
          var farenheit = new Farenheit(numero);
          if (aux == 'c'){
            elemento.innerHTML = farenheit.toCelsius().toFixed(2) + " Celsius";
          }
          else if (aux == 'k'){
            elemento.innerHTML = farenheit.toKelvin().toFixed(2) + " Kelvin";
          }
          break;
        case 'k':
          var kelvin = new Kelvin(numero);
          if (aux == 'c'){
            elemento.innerHTML = kelvin.toCelsius().toFixed(2) + " Celsius";
          }
          else if (aux == 'f'){
            elemento.innerHTML = kelvin.toFarenheit().toFixed(2) + " Farenheit";
          }
        default:
          /* rellene este código */
      }
    }
    else
      elemento.innerHTML = "";
  }
  
})(this);