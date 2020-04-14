/**
 * Objeto que permite receber todos os apontamentos da base de dados, 
 * cadeiras e respetivos anos e semestre associados.
 * 
 * É de notar que os ficheiro podem apenas ser acedidos quando o login se encontra efectuado
 * devido às permissões estabelecidas no acesso a esses mesmos ficheiros.
 * 
 * O link base para ser estabelecido o acesso é:
 *      https://thinktwice.web.ua.pt/cv_plataform/curriculos_dwn.php?url=curriculos_participantes/
 * 
 * A partir daqui devem ser gerados todos os acessos com base num ficheiro php
 * que liga todo o website à db do ThinkTwice.
 * 
 * @author Rui Coelho
 */

$(document).ready(function () {
    var CurriculosInfo = {
        "1" : [
        	{ autor : "Margarida Martins", link : "https://thinktwice.web.ua.pt/cv_plataform/curriculos_dwn.php?url=curriculos_participantes/primeiro_ano/MargaridaMartins.pdf", equipa: "Testemunhas de JAVA"},
		    { autor : "Leandro Silva", link : "https://thinktwice.web.ua.pt/cv_plataform/curriculos_dwn.php?url=curriculos_participantes/primeiro_ano/LeandroSilva.pdf", equipa: "Testemunhas de JAVA"},
		    { autor : "Abel Fernando", link : "https://thinktwice.web.ua.pt/cv_plataform/curriculos_dwn.php?url=curriculos_participantes/primeiro_ano/AbelFernando.pdf", equipa: "Testemunhas de JAVA"},
            ],
        "2" : [
            { autor : "Pedro Escaleira", link : "https://thinktwice.web.ua.pt/cv_plataform/curriculos_dwn.php?url=curriculos_participantes/segundo_ano/PedroEscaleira.pdf", equipa: "Alpha Coders"},
            { autor : "Rafael Simões", link : "https://thinktwice.web.ua.pt/cv_plataform/curriculos_dwn.php?url=curriculos_participantes/segundo_ano/RafaelSimões.pdf", equipa: "Alpha Coders"},
            { autor : "Tiago Mendes", link : "https://thinktwice.web.ua.pt/cv_plataform/curriculos_dwn.php?url=curriculos_participantes/segundo_ano/TiagoMendes.pdf", equipa: "Alpha Coders"},
            { autor : "Diogo Silva", link : "https://thinktwice.web.ua.pt/cv_plataform/curriculos_dwn.php?url=curriculos_participantes/segundo_ano/DiogoSilva.pdf", equipa: "_init_"},
            { autor : "Vasco Ramos", link : "https://thinktwice.web.ua.pt/cv_plataform/curriculos_dwn.php?url=curriculos_participantes/segundo_ano/VascoRamos.pdf", equipa: "_init_"},
            ],
        "3" : [
            { autor : "Isaac Santos", link : "https://thinktwice.web.ua.pt/cv_plataform/curriculos_dwn.php?url=curriculos_participantes/terceiro_ano/IsaacSantos.pdf", equipa: "_init_"},
            { autor : "Rafael Teixeira", link : "https://thinktwice.web.ua.pt/cv_plataform/curriculos_dwn.php?url=curriculos_participantes/terceiro_ano/RafaelTeixeira.pdf", equipa: "Uthê"},
            { autor : "Daniel Nunes", link : "https://thinktwice.web.ua.pt/cv_plataform/curriculos_dwn.php?url=curriculos_participantes/terceiro_ano/DanielNunes.pdf", equipa: "Uthê"},
            ],
        "4" : [
            ],
        "5" : [
            ],
    };

    /**
     * Retorna um elemento (jQuery) utilizado como cabeçalho
     * Se o tamanho não for especificado, cria um elemento h2.
     * 
     * @param {string} headerText Texto do cabeçalho
     * @param {number} size Tamanho do elemento (h1, h2, etc)
     * 
     * * @author Rui Coelho
     */
    function createApontHeader(headerText, size = 2) {
        if (size < 1 || size > 6) {
            size = 2;
        }
        const headerElem = $("<h" + size + ">").addClass("apont-header col-12 u-break-word");

        if (typeof headerText !== "undefined") {
            headerElem.text(headerText);
        }
        return headerElem;

    }

    /**
     * Cria uma entrada do cabeçalho de um tabela.
     * 
     * @param {string} value valor para o cabeçalho
     * @param {string} classes string com as classes a adicionar (separadas por espaços)
     * 
     * @author Rui Coelho
     */
    function createTableHeader(value, classes = undefined) {
        return $("<th>").text(value).addClass(typeof classes === "undefined" ? "" : classes);
    }

    /**
     * Cria uma linha de uma tabela.
     * 
     * @param {string} classes string com as classes adicionar (separadas por espaços).
     * 
     * @author Rui Coelho
     */
    function createTableRow(classes = undefined) {
        return $("<tr>").addClass(typeof classes === "undefined" ? "" : classes);
    }

    /**
     * Cria uma entrada de tabela.
     * Se o valor fornecido for um link, então cria automaticamente o elemento <a> para ser possível de clicar.
     * 
     * @param {string} value valor da entrada.
     * @param {string} classes string com as classes adicionar (separadas por espaços).
     * 
     * @author Rui Coelho
     */
    function createTableData(value, classes = undefined) {
        const linkRegex = /(\b(http(s)?):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gmi;
        if (value.match(linkRegex)) {
            const valueElem = $("<a>").text("Aceder ao currículo").attr({
                "href": value,
                "target": "_blank"
            });
            return $("<td>").addClass(typeof classes === "undefined" ? "" : classes).append(valueElem);
        }
        return $("<td>").text(value).addClass(typeof classes === "undefined" ? "" : classes);
    }

    /**
     * Cria uma linha de uma tabela a partir de um determinado objeto.
     * Apenas cria com base nas colunas desejadas, passadas como array ao parametro attributes.
     * 
     * @param {Array<string>} attributes atributos a criar na linha.
     * @param {object} obj objeto com os dados (Nota: deve ter pelo menos os mesmo atributos que os passados coomo argumento).
     * 
     * @author Rui Coelho
     */
    function createRowFromObject(attributes, obj) {
        const row = createTableRow();

        for (const key of attributes) {
            if (obj.hasOwnProperty(key)) {
                row.append(createTableData(obj[key]));
            }
            else{
            	row.append(createTableData("-"));
            }
        }
        return row;
    }

    /**
     * Cria uma tabela a partir de um array dos cabeçalhos
     * e um array de objetos.
     * Nota: as rows têm a mesma ordem das colunas que as headers fornecidas.
     * 
     * @param {Array<Array<string>>} headers Uma lista de listas com 2 elementos, representando sendo que o 1º elemento é o nome da propriedade 
     * e o segundo como deve ser mostrado.
     * 
     * @param {Array<object>} rows lista dos objetos.
     * 
     * @author Rui Coelho
     */
    function createTable(headers, rows) {
        const table = $("<table>").addClass("table table-striped table-hover");
        const tableHead = $("<thead>");
        const tableBody = $("<tbody>");
        const headersRow = createTableRow();
        const propertyHeaders = [];

        headers.forEach(header => {
            headersRow.append(createTableHeader(header[1]));
            propertyHeaders.push(header[0]);
        });

        tableHead.append(headersRow);

        table.append(tableHead);

        for (const row of rows) {
            tableBody.append(createRowFromObject(propertyHeaders, row));
        }

        table.append(tableBody);

        return table;
    }

    /**
     * Retorna um botão com um handler associado (Nota: De momento, apenas consideramos voltar atrás no ano).
     * 
     * @author Rui Coelho
     */
    function createBackButton() {
        function back_button_handler() {
            $("#anos").removeClass("hide");
            $("#displayer").addClass("hide");
        };
        const button = $("<button>")
            .addClass("btn apont-button col-lg-2 col-md-5 col-sm-10 col-10 offset-lg-5 offset-md-4 offset-sm-1 offset-1")
            .on("click", back_button_handler);
        const arrowIcon = $("<i>").addClass("fa fa-arrow-left").css("font-size", "45px");
        return button.append(arrowIcon);
    }

    /**
     * Retorna um div, com classes caso sejam passadas como argumento.
     * 
     * @param {Array<string>} classes lista das classes a adicionar ao container, opcional.
     * 
     * @author Rui Coelho
     */
    var createContainer = function (classes = undefined) {
        const elem = document.createElement("div");
        if (typeof classes !== 'undefined') {
            if (typeof classes === 'string') {
                elem.classList.add(classes);
            }
            if (Array.isArray(classes)) {
                elem.classList = classes
            }
        }
        return elem;
    }
    /**
     * Retorna um elemento correspondente a um item de uma lista.
     * 
     * @author Rui Coelho
     */
    var createListItem = function (itemText) {
        const elem = document.createElement("a");
        const elem_classes = ["list-group-item", "list-group-item-action"];
        for (let i = 0; i < elem_classes.length; i++) {
            elem.classList.add(elem_classes[i]);
        }
        elem.innerText = itemText;
        return elem;
    }

    let previousYear = undefined;
    /**
     * Função para fazer display dos curriculos para um dado ano.
     * Nota: Apenas faz o re-render da tabela se o botão do ano a ser clicado for diferente do anterior.
     * 
     * @param {string} year 
     * 
     * @author Rui Coelho
     */
    function getCurriculumForYear(year) {
        if (previousYear === year) {
            $("#anos").addClass("hide");
            $("#displayer").removeClass("hide");
            return;
        }

        if ((!year in CurriculosInfo || typeof CurriculosInfo[year] === 'undefined')) {
            return;
        }

        previousYear = year;

        $("#anos").addClass("hide");
        const disp = $("#displayer").empty().removeClass("hide");

        disp.append(
            createApontHeader("Curriculos - " + year + "º Ano")
        );
        const yearElems = CurriculosInfo[year];
        const headerMappings = [
            ["autor", "Nome"],
            ["link", "Currículos"],
            ["equipa", "Equipa do participante"]
        ];
        const tableElem = createTable(headerMappings, yearElems);
        disp.append(tableElem);
        const backElem = createBackButton();
        disp.append(backElem);

    }

    /**
     * Função para tratar dos handlers para os botões.
     * 
     * @author Rui Coelho
     */
    function setupButtons() {

        function btn_click() {
            const year = $(this).data("year");
            getCurriculumForYear(year);
        }

        $(".apont-button").on("click", btn_click);
        $(".apont-button").children().on("click", btn_click);
    }
    /**
     * Função para agrupar todos os handlers.
     * (Nota: neste momento só tem os botões).
     * @author Rui Coelho
     */
    function setupHandlers() {
        setupButtons();
    }
    setupHandlers();

});