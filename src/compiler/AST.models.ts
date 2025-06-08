export class AST {
    rules: ASTRule[] = [];
}

export class ASTRule {
    selector: string = '';
    properties: ASTProperty[] = [];
    state?: string;

    constructor(selector: string) {
        this.selector = selector;
    }
}

export class ASTProperty {
    property: string = '';
    value: any;

    constructor(property: string, value: any) {
        this.property = property;
        this.value = value;
    }
}