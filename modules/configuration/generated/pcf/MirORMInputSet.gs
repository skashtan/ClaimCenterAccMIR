package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/acc/mir/MirORMInputSet.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class MirORMInputSet extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($anMIRReportable_Acc :  MIRReportable_Acc) : void {
    __widgetOf(this, pcf.MirORMInputSet, SECTION_WIDGET_CLASS).setVariables(false, {$anMIRReportable_Acc})
  }
  
  function refreshVariables ($anMIRReportable_Acc :  MIRReportable_Acc) : void {
    __widgetOf(this, pcf.MirORMInputSet, SECTION_WIDGET_CLASS).setVariables(true, {$anMIRReportable_Acc})
  }
  
  
}