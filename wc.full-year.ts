
let _year: string = "";

export async function getYear(): Promise<string> {
    if ( _year ) {
        return _year;
    }
    try {
        const response = await fetch("https://getfullyear.com/api/year", {
            method: "GET",
            mode: "cors",
            headers: { "Content-Type": "application/json" },
        });
        const data = await response.json();
        _year = data.year_string || String(data.year);
        return _year;
    }
    catch( error: any ) {
        console.log("error", error);
        return "????";
    }
}


export class FullYear extends HTMLElement {
    private shadow: ShadowRoot;
    year: string;

    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: "open" });
    }

    async connectedCallback(): Promise<void> {
        this.year = await getYear();
        this.render();
    }

    render(): void {
        this.shadow.innerHTML = `${this.year}`;
    }
}

if (!customElements.get('full-year')) {
  customElements.define('full-year', FullYear);
}
