package pcf

uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/acc/mir/MirClaimDetailsDV.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
public class MirClaimDetailsDV extends com.guidewire.pl.web.codegen.SectionBase {
  function onEnter ($anExposure :  Exposure) : void {
    __widgetOf(this, pcf.MirClaimDetailsDV, SECTION_WIDGET_CLASS).setVariables(false, {$anExposure})
  }
  
  function refreshVariables ($anExposure :  Exposure) : void {
    __widgetOf(this, pcf.MirClaimDetailsDV, SECTION_WIDGET_CLASS).setVariables(true, {$anExposure})
  }
  
  
}