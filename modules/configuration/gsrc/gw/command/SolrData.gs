package gw.command

uses com.guidewire.pl.quickjump.DefaultMethod
uses gw.pl.persistence.core.Bundle
uses gw.api.databuilder.ClaimBuilder
uses gw.api.databuilder.PolicyBuilder
uses gw.api.databuilder.PersonBuilder
uses gw.api.databuilder.CompanyBuilder
uses gw.api.system.CCLoggerCategory
uses gw.api.databuilder.AddressBuilder

/**
 * Run command for loading demo/test data for Lucene/Solr search.
 */
@DefaultMethod("withDefault")
@Export
class SolrData extends CCBaseCommand {
  /**
   * Loads default Solr search demo/test data.
   */
  function withDefault() {
    CCLoggerCategory.APPLICATION.info("Creating Solr Sample Data")
    gw.transaction.Transaction.runWithNewBundle(\ b -> {
      createClaimsWithContacts(b)
    })
    CCLoggerCategory.APPLICATION.info("Solr Sample Data Loaded")
  }
  
  /**
   * Loads data designed to test exact, prefix, soundex, and
   * synonym matches.
   */
  private function createClaimsWithContacts(b:Bundle) {
    
    var insured1 = new PersonBuilder()
      .withFirstName("Roberta").withLastName("Jenkins")
      .withGender(GenderType.TC_F)
      .withPrimaryAddress(new AddressBuilder()
          .withAddressLine1("12 Blaine Street")
          .withAddressLine2("Apt #1")
          .withCity("Burlingame")
          .withState(State.TC_CA)
          .withPostalCode("94010"))
    var addInsured1 = new PersonBuilder()
      .withFirstName("Stephanie").withLastName("Rake")
      .withGender(GenderType.TC_F)
      .withPrimaryAddress(new AddressBuilder()
          .withAddressLine1("2334 Farnhorst Drive")
          .withAddressLine2("Apt #15")
          .withCity("Hayward")
          .withState(State.TC_CA)
          .withPostalCode("94540"))
    var agent1 = new PersonBuilder()
      .withFirstName("Bob").withLastName("Bassington")
      .withGender(GenderType.TC_M)
      .withPrimaryAddress(new AddressBuilder()
          .withAddressLine1("447 Mary Lane")
          .withCity("Hayward")
          .withState(State.TC_CA)
          .withPostalCode("94540"))
    var reporter1 = new PersonBuilder()
      .withFirstName("Henry").withLastName("Williams")
      .withGender(GenderType.TC_M)
      .withPrimaryAddress(new AddressBuilder()
          .withAddressLine1("81 Stewart")
          .withCity("Castro Valley")
          .withState(State.TC_CA)
          .withPostalCode("94546"))
    ClaimBuilder.auto().withPolicy(PolicyBuilder.personalAuto()
        .withContactInRole(insured1, ContactRole.TC_INSURED)
        .withContactInRole(agent1, ContactRole.TC_AGENT)
        .withContactInRole(addInsured1, ContactRole.TC_COVEREDPARTY))
      .withState(ClaimState.TC_OPEN)
      .withReporter(reporter1).withReportedByType(PersonRelationType.TC_FRIEND)
      .create(b)
    
    var insured2 = new PersonBuilder()
      .withFirstName("William").withLastName("Blake")
      .withGender(GenderType.TC_M)
      .withPrimaryAddress(new AddressBuilder()
        .withAddressLine1("12 Dane Street")
        .withAddressLine2("Apt #1")
        .withCity("San Mateo")
        .withState(State.TC_CA)
        .withPostalCode("94401"))
    var agent2 = new PersonBuilder()
      .withFirstName("Robert").withLastName("Washington")
      .withGender(GenderType.TC_M)
      .withPrimaryAddress(new AddressBuilder()
          .withAddressLine1("77 Howard Ave.")
          .withCity("Fremont")
          .withState(State.TC_CA)
          .withPostalCode("94536"))
    ClaimBuilder.homeowners().withPolicy(PolicyBuilder.homeowners()
        .withContactInRole(agent2, ContactRole.TC_AGENT)
        .withContactInRole(insured2, ContactRole.TC_INSURED))
      .withState(ClaimState.TC_OPEN)
      .reportedByInsured()
      .create(b)
    
    var insured3 = new CompanyBuilder() 
      .withCompanyName("Blake Industries Inc.")
      .withPrimaryAddress(new AddressBuilder()
        .withAddressLine1("44 Corporate Circle")
        .withCity("Dublin")
        .withState(State.TC_CA)
        .withPostalCode("94568"))
    var reporter3 = new PersonBuilder()
      .withFirstName("Stephan").withLastName("Wozniak")
      .withGender(GenderType.TC_M)
      .withPrimaryAddress(new AddressBuilder()
          .withAddressLine1("901 Stevens Creek Blvd.")
          .withAddressLine2("Apt #21")
          .withCity("San Jose")
          .withState(State.TC_CA)
          .withPostalCode("95101"))
    ClaimBuilder.generalLiab().withPolicy(PolicyBuilder.generalLiability()
        .withContactInRole(insured3, ContactRole.TC_INSURED))
      .withState(ClaimState.TC_OPEN)
      .withReporter(reporter3)
      .create(b)
      
    var insured4 = new CompanyBuilder()
      .withCompanyName("Henkins Construction Inc.")
      .withPrimaryAddress(new AddressBuilder()
        .withAddressLine1("808 El Camino Real")
        .withCity("San Mateo")
        .withState(State.TC_CA)
        .withPostalCode("94401"))
    var injured4 = new PersonBuilder()
      .withFirstName("Bill").withLastName("Billiard")
      .withGender(GenderType.TC_M)
      .withRelatedContact(ContactBidiRel.TC_EMPLOYER, insured4)
      .withPrimaryAddress(new AddressBuilder()
        .withAddressLine1("444 Stodard Drive")
        .withCity("Dublin")
        .withState(State.TC_CA)
        .withPostalCode("94568"))
    var agent4 = new PersonBuilder()
      .withFirstName("Steven").withLastName("Vassington")
      .withGender(GenderType.TC_M)
      .withPrimaryAddress(new AddressBuilder()
        .withAddressLine1("60 Thrugood Street")
        .withCity("Foster City")
        .withState(State.TC_CA)
        .withPostalCode("94404"))
    var reporter4 = new PersonBuilder()
      .withFirstName("Hank").withLastName("Williams").withSuffix(NameSuffix.TC_JR)
      .withGender(GenderType.TC_M)
      .withPrimaryAddress(new AddressBuilder()
        .withAddressLine1("907 Fredrickson Court")
        .withCity("Palo Alto")
        .withState(State.TC_CA)
        .withPostalCode("94301"))
    ClaimBuilder.workersComp().withPolicy(PolicyBuilder.workersComp()
          .withContactInRole(insured4, ContactRole.TC_INSURED)
          .withContactInRole(agent4, ContactRole.TC_AGENT))
        .withState(ClaimState.TC_OPEN)
        .withContactInRole(injured4, ContactRole.TC_INJURED)
        .withReporter(reporter4)
      .create(b)
      
    var insured5 = new PersonBuilder()
      .withFirstName("Hank").withLastName("Williams")
      .withGender(GenderType.TC_M)
      .withPrimaryAddress(new AddressBuilder()
        .withAddressLine1("111 Rose Ave.")
        .withCity("Sunnyvale")
        .withState(State.TC_CA)
        .withPostalCode("94085"))
    var reporter5 = new PersonBuilder()
      .withFirstName("Billy").withLastName("Rossniac")
      .withGender(GenderType.TC_M)
      .withPrimaryAddress(new AddressBuilder()
        .withAddressLine1("96 Fairview Lane")
        .withCity("Mountain View")
        .withState(State.TC_CA)
        .withPostalCode("94035"))
    var agent5 = new PersonBuilder()
      .withFirstName("Rupert").withLastName("Lenk")
      .withGender(GenderType.TC_M)
      .withPrimaryAddress(new AddressBuilder()
        .withAddressLine1("77 4th Street")
        .withCity("Livermore")
        .withState(State.TC_CA)
        .withPostalCode("94550"))
    ClaimBuilder.auto().withPolicy(PolicyBuilder.personalAuto()
        .withContactInRole(insured5, ContactRole.TC_INSURED)
        .withContactInRole(agent5, ContactRole.TC_AGENT))
      .withState(ClaimState.TC_OPEN)
      .withReporter(reporter5)
      .create(b)
  }
}
