package pcfc.expressions

uses pcf.*
uses entity.*
uses typekey.*
uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/acc/mir/MirClaimDetailsDV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
class MirClaimDetailsDVExpressions {
  @javax.annotation.Generated("config/web/pcf/acc/mir/MirClaimDetailsDV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
  public static class MirClaimDetailsDVExpressionsImpl extends gw.api.web.ScopeBaseClass {
    public construct(widget :  Object) {
      super(widget, 0)
    }
    
    protected construct(widget :  Object, scopeDepth :  int) {
      super(widget, scopeDepth)
    }
    
    // 'def' attribute on InputSetRef (id=mirClaimantInformationInputSetref) at MirClaimDetailsDV.pcf: line 17, column 49
    function def_onEnter_0 (def :  pcf.MirClaimantInformationInputSet) : void {
      def.onEnter(anExposure.mirReportable_Acc)
    }
    
    // 'def' attribute on InputSetRef (id=mirExposureInputSetRef) at MirClaimDetailsDV.pcf: line 20, column 38
    function def_onEnter_2 (def :  pcf.MIRExposureInputSet) : void {
      def.onEnter(anExposure)
    }
    
    // 'def' attribute on InputSetRef (id=OrmRef) at MirClaimDetailsDV.pcf: line 28, column 22
    function def_onEnter_4 (def :  pcf.MirORMInputSet) : void {
      def.onEnter(anExposure.mirReportable_Acc)
    }
    
    // 'def' attribute on ListViewInput (id=mirTpocLv) at MirClaimDetailsDV.pcf: line 35, column 24
    function def_onEnter_6 (def :  pcf.MirTPOCLV) : void {
      def.onEnter(anExposure.mirReportable_Acc)
    }
    
    // 'def' attribute on InputSetRef (id=mirClaimantInformationInputSetref) at MirClaimDetailsDV.pcf: line 17, column 49
    function def_refreshVariables_1 (def :  pcf.MirClaimantInformationInputSet) : void {
      def.refreshVariables(anExposure.mirReportable_Acc)
    }
    
    // 'def' attribute on InputSetRef (id=mirExposureInputSetRef) at MirClaimDetailsDV.pcf: line 20, column 38
    function def_refreshVariables_3 (def :  pcf.MIRExposureInputSet) : void {
      def.refreshVariables(anExposure)
    }
    
    // 'def' attribute on InputSetRef (id=OrmRef) at MirClaimDetailsDV.pcf: line 28, column 22
    function def_refreshVariables_5 (def :  pcf.MirORMInputSet) : void {
      def.refreshVariables(anExposure.mirReportable_Acc)
    }
    
    // 'def' attribute on ListViewInput (id=mirTpocLv) at MirClaimDetailsDV.pcf: line 35, column 24
    function def_refreshVariables_7 (def :  pcf.MirTPOCLV) : void {
      def.refreshVariables(anExposure.mirReportable_Acc)
    }
    
    property get anExposure () : Exposure {
      return getRequireValue("anExposure", 0) as Exposure
    }
    
    property set anExposure ($arg :  Exposure) {
      setRequireValue("anExposure", 0, $arg)
    }
    
    
  }
  
  
}