package pcfc.expressions

uses pcf.*
uses entity.*
uses typekey.*
uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/acc/mir/MirTPOCLV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
class MirTPOCLVExpressions {
  @javax.annotation.Generated("config/web/pcf/acc/mir/MirTPOCLV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
  public static class IteratorEntryExpressionsImpl extends MirTPOCLVExpressionsImpl {
    public construct(widget :  Object) {
      super(widget, 1)
    }
    
    protected construct(widget :  Object, scopeDepth :  int) {
      super(widget, scopeDepth)
    }
    
    // 'value' attribute on DateCell (id=tpocDelayedDate) at MirTPOCLV.pcf: line 35, column 50
    function defaultSetter_13 (__VALUE_TO_SET :  java.lang.Object) : void {
      TPOCDetail.TpocDelayedFunding = (__VALUE_TO_SET as java.util.Date)
    }
    
    // 'value' attribute on DateCell (id=tpocDate) at MirTPOCLV.pcf: line 24, column 40
    function defaultSetter_5 (__VALUE_TO_SET :  java.lang.Object) : void {
      TPOCDetail.TpocDate = (__VALUE_TO_SET as java.util.Date)
    }
    
    // 'value' attribute on CurrencyCell (id=tpocAmount) at MirTPOCLV.pcf: line 29, column 42
    function defaultSetter_9 (__VALUE_TO_SET :  java.lang.Object) : void {
      TPOCDetail.TpocAmount = (__VALUE_TO_SET as gw.api.financials.CurrencyAmount)
    }
    
    // 'value' attribute on DateCell (id=tpocDate) at MirTPOCLV.pcf: line 24, column 40
    function valueRoot_6 () : java.lang.Object {
      return TPOCDetail
    }
    
    // 'value' attribute on DateCell (id=tpocDelayedDate) at MirTPOCLV.pcf: line 35, column 50
    function value_11 () : java.util.Date {
      return TPOCDetail.TpocDelayedFunding
    }
    
    // 'value' attribute on DateCell (id=tpocDate) at MirTPOCLV.pcf: line 24, column 40
    function value_3 () : java.util.Date {
      return TPOCDetail.TpocDate
    }
    
    // 'value' attribute on CurrencyCell (id=tpocAmount) at MirTPOCLV.pcf: line 29, column 42
    function value_7 () : gw.api.financials.CurrencyAmount {
      return TPOCDetail.TpocAmount
    }
    
    property get TPOCDetail () : entity.MIRReportableTPOC_Acc {
      return getIteratedValue(1) as entity.MIRReportableTPOC_Acc
    }
    
    
  }
  
  @javax.annotation.Generated("config/web/pcf/acc/mir/MirTPOCLV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
  public static class MirTPOCLVExpressionsImpl extends gw.api.web.ScopeBaseClass {
    public construct(widget :  Object) {
      super(widget, 0)
    }
    
    protected construct(widget :  Object, scopeDepth :  int) {
      super(widget, scopeDepth)
    }
    
    // 'value' attribute on RowIterator at MirTPOCLV.pcf: line 24, column 40
    function sortValue_0 (TPOCDetail :  entity.MIRReportableTPOC_Acc) : java.lang.Object {
      return TPOCDetail.TpocDate
    }
    
    // 'value' attribute on RowIterator at MirTPOCLV.pcf: line 29, column 42
    function sortValue_1 (TPOCDetail :  entity.MIRReportableTPOC_Acc) : java.lang.Object {
      return TPOCDetail.TpocAmount
    }
    
    // 'value' attribute on RowIterator at MirTPOCLV.pcf: line 35, column 50
    function sortValue_2 (TPOCDetail :  entity.MIRReportableTPOC_Acc) : java.lang.Object {
      return TPOCDetail.TpocDelayedFunding
    }
    
    // 'toAdd' attribute on RowIterator at MirTPOCLV.pcf: line 17, column 50
    function toAdd_15 (TPOCDetail :  entity.MIRReportableTPOC_Acc) : void {
      anMIRReportable_Acc.addToTPOC(TPOCDetail)
    }
    
    // 'toRemove' attribute on RowIterator at MirTPOCLV.pcf: line 17, column 50
    function toRemove_16 (TPOCDetail :  entity.MIRReportableTPOC_Acc) : void {
      anMIRReportable_Acc.removeFromTPOC(TPOCDetail)
    }
    
    // 'value' attribute on RowIterator at MirTPOCLV.pcf: line 17, column 50
    function value_17 () : entity.MIRReportableTPOC_Acc[] {
      return anMIRReportable_Acc.TPOC
    }
    
    property get anMIRReportable_Acc () : MIRReportable_Acc {
      return getRequireValue("anMIRReportable_Acc", 0) as MIRReportable_Acc
    }
    
    property set anMIRReportable_Acc ($arg :  MIRReportable_Acc) {
      setRequireValue("anMIRReportable_Acc", 0, $arg)
    }
    
    
  }
  
  
}