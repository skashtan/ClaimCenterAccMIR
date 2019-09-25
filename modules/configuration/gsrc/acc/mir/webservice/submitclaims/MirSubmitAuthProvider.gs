package acc.mir.webservice.submitclaims

uses javax.xml.namespace.QName
uses gw.xml.ws.WsdlConfig
uses gw.xml.ws.IWsiWebserviceConfigurationProvider

/**
 * Created by Sara.Kashtan on 9/25/2019.
 */
class MirSubmitAuthProvider {

  class MirConfigurationProvider implements IWsiWebserviceConfigurationProvider {
    override function configure(serviceName : QName, portName : QName, config : WsdlConfig) {
      config.Guidewire.Authentication.Username = "username"
      config.Guidewire.Authentication.Password = "P@$$word"
    }
  }
}