package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/acc/mir/MIRExposureInputSet.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class MIRExposureInputSet extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($anExposure :  Exposure) : void {
    __widgetOf(this, pcf.MIRExposureInputSet, SECTION_WIDGET_CLASS).setVariables(false, {$anExposure})
  }
  
  function refreshVariables ($anExposure :  Exposure) : void {
    __widgetOf(this, pcf.MIRExposureInputSet, SECTION_WIDGET_CLASS).setVariables(true, {$anExposure})
  }
  
  
}