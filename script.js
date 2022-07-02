const app = new Vue({
    el: '#app',
    data: () => ({
        baseSeleccionada: "10",
        binario: "",
        octal: "",
        decimal: "",
        hexadecimal: "",
        numero: "",
       
        mostrarNotificacion: false,
    }),
    methods: {
        onBaseONumeroCambiado() {
            this.convertirDeDecimalALasDemasBases(parseInt(this.numero, this.baseSeleccionada));
        },
       
        convertirDeDecimalALasDemasBases(numero) {
            if (!numero)
                return;
            this.binario = numero.toString("2");
            this.octal = numero.toString("8");
            this.decimal = numero.toString("10");
            this.hexadecimal = numero.toString("16");
        },
        
        copiarAlPortapapeles(texto) {
            if (!texto) return;
            if (!navigator.clipboard) {
                return this.copiarAlPortapapelesSiLaPrimeraOpcionFalla(texto);
            }
            navigator.clipboard.writeText(texto)
                .then(() => {
                    console.log("El texto ha sido copiado :-)");
                    this.indicarCopiadoExitoso();
                })
                .catch(error => {
                    
                    console.log("Hubo un error: ", error);
                    this.copiarAlPortapapelesSiLaPrimeraOpcionFalla(texto);
                });
        },
        copiarAlPortapapelesSiLaPrimeraOpcionFalla(texto) {
            prompt("Presiona CTRL + C para copiar, y luego presiona ENTER", texto);
            this.indicarCopiadoExitoso();
        },
        indicarCopiadoExitoso() {
            this.mostrarNotificacion = true;
            setTimeout(() => {
                this.mostrarNotificacion = false;
            }, 1000);
        }
    },
   
    watch: {
        baseSeleccionada() {
            this.onBaseONumeroCambiado();
        },
        numero() {
            this.onBaseONumeroCambiado();
        }
    }
});