// Type definitions for v-tooltip 3.2
// Project: https://github.com/Akryum/v-tooltip#readme
// Definitions by: Raymond Kandawasvika <https://github.com/okandas>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 3.6

declare module 'v-tooltip' {

    import Vue, { VueConstructor, DirectiveOptions, PluginFunction } from 'vue';
    
    export const VPopover: VueConstructor<Vue>;
    export const VClosePopover: DirectiveOptions;
    export const VToolTip: PluginFunction<any>;
    
    export default VToolTip;
  
  }