package pcfc.expressions

uses pcf.*
uses entity.*
uses typekey.*
uses gw.api.locale.DisplayKey
@javax.annotation.Generated("config/web/pcf/acc/mir/MIRExposureInputSet.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
class MIRExposureInputSetExpressions {
  @javax.annotation.Generated("config/web/pcf/acc/mir/MIRExposureInputSet.pcf", "", "com.guidewire.pcfgen.PCFClassGenerator")
  public static class MIRExposureInputSetExpressionsImpl extends gw.api.web.ScopeBaseClass {
    public construct(widget :  Object) {
      super(widget, 0)
    }
    
    protected construct(widget :  Object, scopeDepth :  int) {
      super(widget, scopeDepth)
    }
    
    // 'value' attribute on TextInput (id=LastName) at MIRExposureInputSet.pcf: line 33, column 23
    function defaultSetter_10 (__VALUE_TO_SET :  java.lang.Object) : void {
      (anExposure.Claimant as Person).LastName = (__VALUE_TO_SET as java.lang.String)
    }
    
    // 'value' attribute on DateInput (id=mirDateOfBirth) at MIRExposureInputSet.pcf: line 39, column 60
    function defaultSetter_16 (__VALUE_TO_SET :  java.lang.Object) : void {
      (anExposure.Claimant as Person).DateOfBirth = (__VALUE_TO_SET as java.util.Date)
    }
    
    // 'value' attribute on TextInput (id=mirFirstName) at MIRExposureInputSet.pcf: line 17, column 23
    function defaultSetter_2 (__VALUE_TO_SET :  java.lang.Object) : void {
      (anExposure.Claimant as Person).FirstName = (__VALUE_TO_SET as java.lang.String)
    }
    
    // 'value' attribute on PrivacyInput (id=mirTaxID) at MIRExposureInputSet.pcf: line 46, column 61
    function defaultSetter_20 (__VALUE_TO_SET :  java.lang.Object) : void {
      (anExposure.Claimant as Person).Person.TaxID = (__VALUE_TO_SET as java.lang.String)
    }
    
    // 'value' attribute on TypeKeyInput (id=mirGender) at MIRExposureInputSet.pcf: line 52, column 39
    function defaultSetter_25 (__VALUE_TO_SET :  java.lang.Object) : void {
      (anExposure.Claimant as Person).Gender = (__VALUE_TO_SET as typekey.GenderType)
    }
    
    // 'value' attribute on TextInput (id=MiddleName) at MIRExposureInputSet.pcf: line 25, column 23
    function defaultSetter_6 (__VALUE_TO_SET :  java.lang.Object) : void {
      (anExposure.Claimant as Person).MiddleName = (__VALUE_TO_SET as java.lang.String)
    }
    
    // 'encryptionExpression' attribute on PrivacyInput (id=mirTaxID) at MIRExposureInputSet.pcf: line 46, column 61
    function encryptionExpression_22 (VALUE :  java.lang.String) : java.lang.String {
      return (anExposure.Claimant as Person).maskTaxId(VALUE)
    }
    
    // 'validationExpression' attribute on DateInput (id=mirDateOfBirth) at MIRExposureInputSet.pcf: line 39, column 60
    function validationExpression_12 () : java.lang.Object {
      return ((anExposure.Claimant as Person).DateOfBirth == null or (anExposure.Claimant as Person).DateOfBirth <= gw.api.upgrade.Coercions.makeDateFrom("today")) ? null : DisplayKey.get("Web.ContactDetail.AdditionalInfo.DateOfBirth.FutureError")
    }
    
    // 'value' attribute on PrivacyInput (id=mirTaxID) at MIRExposureInputSet.pcf: line 46, column 61
    function valueRoot_21 () : java.lang.Object {
      return (anExposure.Claimant as Person).Person
    }
    
    // 'value' attribute on TextInput (id=mirFirstName) at MIRExposureInputSet.pcf: line 17, column 23
    function valueRoot_3 () : java.lang.Object {
      return (anExposure.Claimant as Person)
    }
    
    // 'value' attribute on TextInput (id=mirFirstName) at MIRExposureInputSet.pcf: line 17, column 23
    function value_0 () : java.lang.String {
      return (anExposure.Claimant as Person).FirstName
    }
    
    // 'value' attribute on DateInput (id=mirDateOfBirth) at MIRExposureInputSet.pcf: line 39, column 60
    function value_13 () : java.util.Date {
      return (anExposure.Claimant as Person).DateOfBirth
    }
    
    // 'value' attribute on PrivacyInput (id=mirTaxID) at MIRExposureInputSet.pcf: line 46, column 61
    function value_18 () : java.lang.String {
      return (anExposure.Claimant as Person).Person.TaxID
    }
    
    // 'value' attribute on TypeKeyInput (id=mirGender) at MIRExposureInputSet.pcf: line 52, column 39
    function value_23 () : typekey.GenderType {
      return (anExposure.Claimant as Person).Gender
    }
    
    // 'value' attribute on TextInput (id=MiddleName) at MIRExposureInputSet.pcf: line 25, column 23
    function value_4 () : java.lang.String {
      return (anExposure.Claimant as Person).MiddleName
    }
    
    // 'value' attribute on TextInput (id=LastName) at MIRExposureInputSet.pcf: line 33, column 23
    function value_8 () : java.lang.String {
      return (anExposure.Claimant as Person).LastName
    }
    
    property get anExposure () : Exposure {
      return getRequireValue("anExposure", 0) as Exposure
    }
    
    property set anExposure ($arg :  Exposure) {
      setRequireValue("anExposure", 0, $arg)
    }
    
    
  }
  
  
}