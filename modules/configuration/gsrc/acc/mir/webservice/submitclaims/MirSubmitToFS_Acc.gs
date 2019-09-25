package acc.mir.webservice.submitclaims

uses acc.mir.webservice.mirclaims.dataservice.DataService
uses acc.mir.webservice.mirclaims.dataservice.elements.SubmitClaim

/**
 * Created by Sara.Kashtan on 9/25/2019.
 */
class MirSubmitToFS_Acc {

  @Param("exposure", "Exposure to be submitted")
  function submitClaim(exposure : Exposure) {

    var service = new DataService()

    var c = service.Config

    // Create XML from the WSDL
    var req = new SubmitClaim()
    req.Claim.RREID = '123456'
   // var req = new acc.mir.webservice.mirclaims.dataservice.elements.ClaimData()

    //req.$Children.
    // Call SubmitClaim
    var resp = service.SubmitClaim(req)
  }

}