package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/acc/mir/MirClaimantInformationInputSet.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class MirClaimantInformationInputSet extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($anMIRReportable_Acc :  MIRReportable_Acc) : void {
    __widgetOf(this, pcf.MirClaimantInformationInputSet, SECTION_WIDGET_CLASS).setVariables(false, {$anMIRReportable_Acc})
  }
  
  function refreshVariables ($anMIRReportable_Acc :  MIRReportable_Acc) : void {
    __widgetOf(this, pcf.MirClaimantInformationInputSet, SECTION_WIDGET_CLASS).setVariables(true, {$anMIRReportable_Acc})
  }
  
  
}