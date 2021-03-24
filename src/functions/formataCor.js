
module.exports = {
    formataCor(cor, brilho){
        function hex(vermelho, verde, azul){
            var codigo;
            vermelho = vermelho.toString(16);
            if(vermelho.length === 1) vermelho="0"+vermelho
            verde = verde.toString(16);
            if(verde.length === 1) verde="0"+verde
            azul = azul.toString(16);
            if(azul.length === 1) azul="0"+azul
            codigo= "#" + vermelho + verde + azul;  
            //console.log(vermelho, verde, azul, codigoCor);
            return codigo;
        }
        
        var vermelho, verde, azul, codigoCor, codigoCorSemBrilho;
        cor = parseInt(cor)
        brilho = parseInt(brilho)
        if(cor <= 255){
            vermelho = 255;
            verde = 0;
            azul = 0;
            verde = cor;            
        }
        else if(cor>= 256 && cor <= 510){
            vermelho = 255;
            verde = 255;
            azul = 0;
            vermelho = vermelho-(cor-255)
            
            
        }
        else if(cor>= 511 && cor <= 765){
            vermelho = 0;
            verde = 255;
            azul = 0;
            azul = cor-510;
            
            
        }
        else if(cor>= 766 && cor <= 1020){
            vermelho = 0;
            verde = 255;
            azul = 255;
            verde = verde-(cor-765); 
                        
        }
        else if(cor>= 1021 && cor <= 1275){
            vermelho = 0;
            verde = 0;
            azul = 255;  
            vermelho = cor-1020;   
                    
        }
        else if(cor>= 1276 && cor <= 1530) {
            vermelho=255;
            verde=0;
            azul=255;
            azul= azul-(cor-1275);
        }
        
        codigoCorSemBrilho = hex(vermelho, verde, azul);
        vermelho = vermelho+brilho;
        verde = verde+brilho;
        azul = azul+brilho;  
        
        if(vermelho > 255) vermelho=255;
        else if(vermelho < 0) vermelho=0;
        if(verde > 255) verde=255;
        else if(verde < 0) verde=0;
        if(azul > 255) azul=255;
        else if(azul < 0) azul=0;
        codigoCor = hex(vermelho, verde, azul);
        return [codigoCor, codigoCorSemBrilho];        
    }
}

