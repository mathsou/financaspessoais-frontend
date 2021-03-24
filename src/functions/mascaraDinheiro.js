
module.exports = {
    mascaraDinheiro(valor){
        var valorInicial = valor;
        if(String(valor).indexOf('R$') === 0) {
            if(String(valor).length === 6 && String(valor).indexOf('0,0') === 3){
                return '';
            }

            else if(String(valor).length < 6 && String(valor).length >1){
                return '';
            }
            if(valor.indexOf('0,0') === 3){
                valor = parseFloat(valor.slice(6));

            }
            else if(valor.indexOf('0,') === 3){
                valor = parseFloat(valor.slice(5));

            }
            else{
                valor = valor.slice(3).replace(",", '');
                if(valor.indexOf('.') !== -1) valor = valor.replace(/\./g, '');
                valor = parseFloat(valor)
            }       
        }
        if(typeof parseFloat(valor) === "number" && parseFloat(valor)){
            valor = valor/100
            return Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(valor);
        }
        else{      
            if(String(valorInicial).indexOf("R$") === 0){
                return valorInicial;
            }
            else {
                return '';
            }
        }
    },

    removeMascara(valor) {
        valor = valor.slice(3).replace(",", '');
        if(valor.indexOf('.') !== -1) valor = valor.replace(/\./g, '');
        valor = parseFloat(valor);
        valor = valor/100
        return valor;
    }
}
