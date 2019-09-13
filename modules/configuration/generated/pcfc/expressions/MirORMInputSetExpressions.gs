package pcfc.expressions

uses pcf.*
uses entity.*
uses typekey.*
uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/acc/mir/MirORMInputSet.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
class MirORMInputSetExpressions {
  @javax.annotation.Generated("config/web/pcf/acc/mir/MirORMInputSet.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
  public static class MirORMInputSetExpressionsImpl extends gw.api.web.ScopeBaseClass {
    public construct(widget :  Object) {
      super(widget, 0)
    }
    
    protected construct(widget :  Object, scopeDepth :  int) {
      super(widget, scopeDepth)
    }
    
    // 'value' attribute on BooleanRadioInput (id=HasOrm) at MirORMInputSet.pcf: line 16, column 23
    function defaultSetter_2 (__VALUE_TO_SET :  java.lang.Object) : void {
      anMIRReportable_Acc.HasORM = (__VALUE_TO_SET as java.lang.Boolean)
    }
    
    // 'value' attribute on DateInput (id=OrmTermDate) at MirORMInputSet.pcf: line 21, column 48
    function defaultSetter_6 (__VALUE_TO_SET :  java.lang.Object) : void {
      anMIRReportable_Acc.ORMTermDate = (__VALUE_TO_SET as java.util.Date)
    }
    
    // 'value' attribute on BooleanRadioInput (id=HasOrm) at MirORMInputSet.pcf: line 16, column 23
    function valueRoot_3 () : java.lang.Object {
      return anMIRReportable_Acc
    }
    
    // 'value' attribute on BooleanRadioInput (id=HasOrm) at MirORMInputSet.pcf: line 16, column 23
    function value_0 () : java.lang.Boolean {
      return anMIRReportable_Acc.HasORM
    }
    
    // 'value' attribute on DateInput (id=OrmTermDate) at MirORMInputSet.pcf: line 21, column 48
    function value_4 () : java.util.Date {
      return anMIRReportable_Acc.ORMTermDate
    }
    
    property get anMIRReportable_Acc () : MIRReportable_Acc {
      return getRequireValue("anMIRReportable_Acc", 0) as MIRReportable_Acc
    }
    
    property set anMIRReportable_Acc ($arg :  MIRReportable_Acc) {
      setRequireValue("anMIRReportable_Acc", 0, $arg)
    }
    
    
  }
  
  
}