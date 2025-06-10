export type SymbolTypes = 'root'|'comment'|'selector'|'property'|'value'|'state'|'operator';

export class Token {
    type: SymbolTypes;
    value: string = '';
    indentLevel: number = 0;
    canHaveChildren: boolean = false;
    children: Token[] = [];

    constructor(
        type: SymbolTypes, 
        value: string, 
        indentLevel: number, 
        canHaveChildren: boolean = false
    ) {
        this.type = type;
        this.value = value;
        this.indentLevel = indentLevel;
        this.canHaveChildren = canHaveChildren;
    }

    findChildrenByCriteria(criteria: (token: Token) => boolean): Token[] {
        let result: Token[] = [];

        let childMatches: Token[] = this.children.filter(criteria);
        result.push(...childMatches);
        
        for (let child of this.children) {
            let descendantMatches = child.findChildrenByCriteria(criteria);
            result.push(...descendantMatches);
        }

        return result;
    }

    treeNodeName(): string {
        if (this.type === 'root')
            return '\n[+][ROOT]'

        return `${' '.repeat(this.indentLevel)} |-${this.canHaveChildren ? '[+]' : ''} ${this.type}: ${this.value} `;
    }

    renderTree(): string {
        let result = this.treeNodeName() + '\n';
        let childResults = this.children.map(c => c.renderTree());
        result = result + childResults.join('');

        return result;
    }
}