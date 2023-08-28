import type { FlowGraphContext } from "../../flowGraphContext";
import { FlowGraphBlock } from "../../flowGraphBlock";
import type { FlowGraphDataConnection } from "../../flowGraphDataConnection";

/**
 * @experimental
 */
export interface IFlowGraphConditionalDataBlockParams<T> {
    defaultTrueValue: T;
    defaultFalseValue: T;
}

/**
 * @experimental
 * Block that returns a value based on a condition.
 */
export class FlowGraphConditionalDataBlock<T> extends FlowGraphBlock {
    public readonly condition: FlowGraphDataConnection<boolean>;
    public readonly trueValue: FlowGraphDataConnection<T>;
    public readonly falseValue: FlowGraphDataConnection<T>;

    public readonly output: FlowGraphDataConnection<T>;

    constructor(params: IFlowGraphConditionalDataBlockParams<T>) {
        super();

        this.condition = this._registerDataInput("condition", false);
        this.trueValue = this._registerDataInput("trueValue", params.defaultTrueValue);
        this.falseValue = this._registerDataInput("falseValue", params.defaultFalseValue);

        this.output = this._registerDataOutput("output", params.defaultFalseValue);
    }

    /**
     * @internal
     */
    public _updateOutputs(context: FlowGraphContext): void {
        if (this.condition.getValue(context)) {
            this.output.value = this.trueValue.getValue(context);
        } else {
            this.output.value = this.falseValue.getValue(context);
        }
    }
}
