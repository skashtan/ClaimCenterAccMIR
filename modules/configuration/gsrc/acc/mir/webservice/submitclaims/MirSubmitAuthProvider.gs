package acc.mir.webservice.submitclaims

uses javax.xml.namespace.QName
uses gw.xml.ws.WsdlConfig
uses gw.xml.ws.IWsiWebserviceConfigurationProvider

class MirSubmitAuthProvider {

  class MirConfigurationProvider implements IWsiWebserviceConfigurationProvider {
    override function configure(serviceName : QName, portName : QName, config : WsdlConfig) {
      print("here")
      config.Http.Authentication.Basic.Username = "skashtan"
      config.Http.Authentication.Basic.Password  = "gwTESTpw!"
      print("here1")
    }
  }
}