package gw.sampledata

uses gw.pl.persistence.core.Bundle
uses gw.api.databuilder.PolicyCoverageBuilder
uses gw.api.databuilder.PolicyBuilder
uses gw.api.databuilder.TripRUBuilder
uses gw.api.databuilder.PersonBuilder
uses gw.api.databuilder.AddressBuilder
uses gw.api.databuilder.ClaimBuilder
uses gw.api.databuilder.TripIncidentBuilder
uses gw.api.databuilder.BaggageIncidentBuilder
uses gw.api.databuilder.ExposureBuilder
uses gw.api.databuilder.CheckBuilder
uses gw.api.databuilder.AssessmentContentItemBuilder
uses java.util.Date
uses gw.api.databuilder.TripSegmentBuilder
uses gw.api.databuilder.AddnlTripSegmentBuilder
uses gw.api.databuilder.TripAccommodationBuilder
uses gw.api.databuilder.AddnlTripAccommodationBuilder
uses gw.api.databuilder.PolicyPeriodBuilder
uses gw.api.databuilder.FinancialCovTermBuilder

@Export
class SampleTravelClaims extends SampleDataBase {

  construct(inCache : SampleDataCache) {
    super(inCache)
  }

  override property get Description() : String {
    return "Travel Claims and associated Contacts, Policies, Exposures, Notes, ClaimContacts, Activities and Financials"
  }
    
  override function testSampleData(bundle : Bundle) {
    var claim1Info : ClaimInfo
    var claim2Info : ClaimInfo
    var claim3Info : ClaimInfo
    { // claim 765-10-132541, Frances Beale, lost passport
      var policy = getFrancesBealePolicyBuilder( BaseDate ).create(bundle)
      
      var toronto = new AddressBuilder()
        .withCity("Toronto")
        .withState( State.TC_ON )
        .withCountry(Country.TC_CA)
      
      var claim = new ClaimBuilder()
        .withClaimNumber("765-10-132541")
        .withPolicy(policy)
        .withLossDate(BaseDate.addDays(-5))
        .withIncidentReport( false )
        .withReportedDate(BaseDate.addDays(-1))
        .withFlagged(TC_NEVERFLAGGED)
        .withLossLocation(toronto)
        .withLossCause(LossCause.TC_DOCUMENTS)
        .withReporter(policy.insured)
        .withMainContactType( PersonRelationType.TC_SELF )
        .withReportedByType( PersonRelationType.TC_SELF )
        .withLossType(LossType.TC_TRAV)
        .withValidationLevel(ValidationLevel.TC_PAYMENT)
        .withCoverageInQuestion(false)
        .withAssignmentStatus( TC_ASSIGNED )
        .withAssignedGroup(findGroupByName("Western Travel Group"))
        .withAssignedUser(findUserByUserName("eaustin"))
        .withAssignmentDate( BaseDate.addDays(-1) )
        .withCurrency(gw.api.util.CurrencyUtil.getDefaultCurrency())
        .withDescription("Lost Passport")
        .withState(ClaimState.TC_OPEN)
        .withLOBCode(LOBCode.TC_TRAVEL)
        .create(bundle)
      claim1Info = claim.ClaimInfo
      
      var baggageIncident = new BaggageIncidentBuilder()
            .onClaim(claim)
            .withRelatedTripRU(policy.RiskUnits.firstWhere( \ r -> r.Subtype == typekey.RiskUnit.TC_TRIPRU ) as TripRU)
            .withBaggageType( BaggageType.TC_DOCUMENTS )
            .withDelayOnly( false )
            .withBaggageMissingFrom( BaseDate.addDays(-5 ) )
            .withLocationAddress( toronto )
            .withCarrierCompensated( false ) 
            .withPropertyDesc( "Tickets & passport" )
            .withContentItemLine( new AssessmentContentItemBuilder()
              .withDescription( "US Passport" )
              .withDateAcquired( BaseDate.addYears(-1) )
              .withAction( AssessmentContentAction.TC_APPROVE )
              .withPurchaseCost( 160bd.ofDefaultCurrency() )
              .withContentCategory( ContentLineItemCategory.TC_OTHER ) )
            .create(bundle)
            
      var baggageExposure = new ExposureBuilder()
          .onClaim(claim)
          .withExposureType( ExposureType.TC_BAGGAGE )
          .withClaimant( policy.insured )
          .withClaimantType( ClaimantType.TC_INSURED )
          .withCoverage( policy.Coverages.firstWhere( \ p -> p.Type == CoverageType.TC_BAGGAGE ) )
          .withCoverageSubtypeAndRelatedFields( CoverageSubtype.TC_BAG_LOSS_DAMG_DLY )
          .withIncident(baggageIncident)
          .withClaimAssignment()
          .withState( ExposureState.TC_OPEN )
          .withClaimOrder( 1 )
          .create(bundle)

      var checkSet = new gw.api.databuilder.CheckSetBuilder()
        .withApprovalDate(BaseDate.addDays(-1))
        .withRequestingUser(findUserByUserName("eaustin"))
        .withApprovalStatus(TC_APPROVED)
        .onClaim(claim)
        .create(bundle)

      var reserveSet = new gw.api.databuilder.ReserveSetBuilder()
        .withApprovalDate(BaseDate.addDays(-1))
        .withRequestingUser(findUserByUserName("eaustin"))
        .withApprovalStatus(TC_APPROVED)
        .onClaim(claim)
        .create(bundle)

      var reserveLine = new gw.api.databuilder.ReserveLineBuilder()
        .withExposure( baggageExposure )
        .withCostType(CostType.TC_CLAIMCOST)
        .withCostCategory(CostCategory.TC_BAGGAGE)
        .withClaim(claim)
        .create(bundle)
        
      new gw.api.databuilder.ReserveBuilder()
        .withReserveLine(reserveLine)
        .onClaim(claim)
        .onTransactionSet(reserveSet)
        .withCurrency(claim.Currency)
        .withStatus(TC_SUBMITTED)
        .withLineItem( 160bd.ofDefaultCurrency(), LineCategory.TC_OTHER )
        .create(bundle)
      
      var check = new gw.api.databuilder.CheckBuilder()
        .onClaim(claim)
        .withIssueDate(BaseDate.addDays(-1))
        .withScheduledSendDate(BaseDate.addDays(-1))
        .withBankAccount(BankAccount.TC_DEFAULT)
        .onCheckSet(checkSet)
        .withPayTo("Frances Beale")
        .withStatus(TransactionStatus.TC_ISSUED)
        .withPaymentMethod(PaymentMethod.TC_CHECK)
        .withCheckNumber("652115")
        .withPayee(new gw.api.databuilder.CheckPayeeBuilder()
          .withPayee(policy.insured)
          .withPayeeType(ContactRole.TC_CLAIMANT))
        .withType(CheckType.TC_PRIMARY)
        .create(bundle)

      new gw.api.databuilder.PaymentBuilder()
        .withReserveLine(reserveLine)
        .onClaim(claim)
        .onTransactionSet(checkSet)
        .withCurrency(claim.Currency)
        .withStatus(TransactionStatus.TC_SUBMITTED)
        .onCheck(check)
        .withPaymentType(PaymentType.TC_FINAL)
        .withLineItem(  160bd.ofDefaultCurrency(), "Baggage", LineCategory.TC_OTHER )
        .create(bundle)
    }

    { // claim 765-10-132550, Stephen Beale, missed flight
      var policy = getFrancesBealePolicyBuilder( BaseDate ).create(bundle)
      
      var newyork = new AddressBuilder()
        .withCity("New York")
        .withState( State.TC_NY )
        .withCountry(Country.TC_US)
      
      var claim = new ClaimBuilder()
        .withClaimNumber("765-10-132550")
        .withPolicy(policy)
        .withLossDate(BaseDate.addDays(-5))
        .withIncidentReport( false )
        .withReportedDate(BaseDate.addDays(-1))
        .withFlagged(TC_NEVERFLAGGED)
        .withLossLocation(newyork)
        .withLossCause(LossCause.TC_MISSED_DEPARTURE)
        .withReporter(policy.coveredparty.firstWhere( \ c -> c typeis Person and c.FirstName == "Stephen" ))
        .withReportedByType( PersonRelationType.TC_SPOUSE )
        .withLossType(LossType.TC_TRAV)
        .withValidationLevel(ValidationLevel.TC_PAYMENT)
        .withCoverageInQuestion(false)
        .withAssignmentStatus( TC_ASSIGNED )
        .withAssignedGroup(findGroupByName("Western Travel Group"))
        .withAssignedUser(findUserByUserName("eaustin"))
        .withAssignmentDate( BaseDate.addDays(-1) )
        .withCurrency(gw.api.util.CurrencyUtil.getDefaultCurrency())
        .withDescription("Missed flight")
        .withState(ClaimState.TC_OPEN)
        .withLOBCode(LOBCode.TC_TRAVEL)
        .create(bundle)
      claim2Info = claim.ClaimInfo
      
      var tripIncident = new TripIncidentBuilder()
            .onClaim(claim)
            .withTripRU(policy.RiskUnits.firstWhere( \ r -> r.Subtype == typekey.RiskUnit.TC_TRIPRU ) as TripRU)
            .withLossEstimate( 150bd.ofDefaultCurrency() )
            .withTripSegment( new TripSegmentBuilder()
              .withTransportType( TransportType.TC_AIRLINE )
              .withCarrierName( "United" )
              .withCarrierNumber( "0027" )
              .withPortOfEmbarkation( "JFK" )
              .withPortOfDisembarkation( "SYD" )
              .withStartDate( BaseDate.addDays(-5).addHours(15).addMinutes(52) )
              .withEndDate( BaseDate.addDays(-4).addHours(15).addMinutes(50) )
              .withCancelOnly( false )
              .withCancellationFees( 150bd.ofDefaultCurrency() )
              .withAssessment( AssessmentAction.TC_APPROVE )
              .withAddnlTripSegment( new AddnlTripSegmentBuilder()
                .withTransportType( TransportType.TC_AIRLINE )
                .withCarrierName( "United" )
                .withCarrierNumber( "0027" )
                .withPortOfEmbarkation( "JFK" )
                .withPortOfDisembarkation( "SYD" )
                .withStartDate( BaseDate.addDays(-4).addHours(15).addMinutes(52) )
                .withEndDate( BaseDate.addDays(-3).addHours(15).addMinutes(50) ) ) )
            .create(bundle)

      var tripExposure = new ExposureBuilder()
          .onClaim(claim)
          .withExposureType( ExposureType.TC_TRIPCANCELLATIONDELAY )
          .withClaimant( claim.reporter )
          .withClaimantType( ClaimantType.TC_INSURED )
          .withCoverage(policy.Coverages.firstWhere( \ p -> p.Type == CoverageType.TC_TRIP))
          .withCoverageSubtypeAndRelatedFields( CoverageSubtype.TC_TRIPCANCELDELAY )
          .withIncident(tripIncident)
          .withClaimAssignment()
          .withState( ExposureState.TC_OPEN )
          .withClaimOrder( 1 )
          .create(bundle)

      var checkSet = new gw.api.databuilder.CheckSetBuilder()
        .withApprovalDate(BaseDate.addDays(-1))
        .withRequestingUser(findUserByUserName("eaustin"))
        .withApprovalStatus(TC_APPROVED)
        .onClaim(claim)
        .create(bundle)

      var reserveSet = new gw.api.databuilder.ReserveSetBuilder()
        .withApprovalDate(BaseDate.addDays(-1))
        .withRequestingUser(findUserByUserName("eaustin"))
        .withApprovalStatus(TC_APPROVED)
        .onClaim(claim)
        .create(bundle)

      var reserveLine = new gw.api.databuilder.ReserveLineBuilder()
        .withExposure( tripExposure )
        .withCostType(CostType.TC_CLAIMCOST)
        .withCostCategory(CostCategory.TC_TRIP_CANCEL_DELAY)
        .withClaim(claim)
        .create(bundle)
        
      new gw.api.databuilder.ReserveBuilder()
        .withReserveLine(reserveLine)
        .onClaim(claim)
        .onTransactionSet(reserveSet)
        .withCurrency(claim.Currency)
        .withStatus(TC_SUBMITTED)
        .withLineItem( 150bd.ofDefaultCurrency(), LineCategory.TC_OTHER )
        .create(bundle)
      
      var check = new gw.api.databuilder.CheckBuilder()
        .onClaim(claim)
        .withIssueDate(BaseDate.addDays(-1))
        .withScheduledSendDate(BaseDate.addDays(-1))
        .withBankAccount(BankAccount.TC_DEFAULT)
        .onCheckSet(checkSet)
        .withPayTo("Stephen Beale")
        .withStatus(TransactionStatus.TC_ISSUED)
        .withPaymentMethod(PaymentMethod.TC_CHECK)
        .withCheckNumber("652276")
        .withPayee(new gw.api.databuilder.CheckPayeeBuilder()
          .withPayee(claim.reporter)
          .withPayeeType(ContactRole.TC_CLAIMANT))
        .withType(CheckType.TC_PRIMARY)
        .create(bundle)

      new gw.api.databuilder.PaymentBuilder()
        .withReserveLine(reserveLine)
        .onClaim(claim)
        .onTransactionSet(checkSet)
        .withCurrency(gw.api.util.CurrencyUtil.getDefaultCurrency())
        .withStatus(TransactionStatus.TC_SUBMITTED)
        .onCheck(check)
        .withPaymentType(PaymentType.TC_FINAL)
        .withLineItem(  150bd.ofDefaultCurrency(), LineCategory.TC_OTHER )
        .create(bundle)    
    }

    { // claim 765-10-132684, Jeffrey Lieberman, trip canceled
      var policy = getJeffreyLiebermanPolicyBuilder( BaseDate ).create(bundle)
      
      new AddressBuilder()
        .withCity("New York")
        .withState( State.TC_NY )
        .withCountry(Country.TC_US)
      
      var claim = new ClaimBuilder()
        .withClaimNumber("765-10-132684")
        .withPolicy( policy )
        .withLossDate(BaseDate)
        .withIncidentReport( false )
        .withReportedDate(BaseDate)
        .withFlagged(TC_NEVERFLAGGED)
        .withLossLocation(policy.insured.PrimaryAddress)
        .withLossCause(LossCause.TC_DEATH)
        .withReporter(policy.insured)
        .withReportedByType( PersonRelationType.TC_SELF )
        .withLossType(LossType.TC_TRAV)
        .withValidationLevel(ValidationLevel.TC_PAYMENT)
        .withCoverageInQuestion(false)
        .withAssignmentStatus( TC_ASSIGNED )
        .withAssignedGroup(findGroupByName("Western Travel Group"))
        .withAssignedUser(findUserByUserName("eaustin"))
        .withAssignmentDate( BaseDate )
        .withCurrency(gw.api.util.CurrencyUtil.getDefaultCurrency())
        .withDescription("Trip canceled due to death in the family.")
        .withState(ClaimState.TC_OPEN)
        .withLOBCode(LOBCode.TC_TRAVEL)
        .create(bundle)
      
      var tripIncident = new TripIncidentBuilder()
            .onClaim(claim)
            .withTripRU( policy.RiskUnits.firstWhere( \ r -> r typeis TripRU ) as TripRU )
            .withLossEstimate( 320bd.ofDefaultCurrency() )
            .withTripSegment( new TripSegmentBuilder()
              .withTransportType( TransportType.TC_AIRLINE )
              .withCarrierName( "Singapore Airlines" )
              .withCarrierNumber( "21" )
              .withPortOfEmbarkation( "LAX" )
              .withPortOfDisembarkation( "BKK" )
              .withStartDate( BaseDate.addHours(16).addMinutes(49) )
              .withEndDate( BaseDate.addDays(1).addHours(4).addMinutes(50) )
              .withCancelOnly( true )
              .withCancellationFees( 100bd.ofDefaultCurrency() )
              .withReasonForCancellation( "Death in the family" )
              .withAssessment( AssessmentAction.TC_APPROVE ) )
            .withTripSegment( new TripSegmentBuilder()
              .withTransportType( TransportType.TC_AIRLINE )
              .withCarrierName( "Singapore Airlines" )
              .withCarrierNumber( "22" )
              .withPortOfEmbarkation( "BKK" )
              .withPortOfDisembarkation( "LAX" )
              .withStartDate( BaseDate.addDays(25).addHours(22).addMinutes(50) )
              .withEndDate( BaseDate.addDays(26).addHours(15).addMinutes(32) )
              .withCancelOnly( true )
              .withCancellationFees( 100bd.ofDefaultCurrency() )
              .withReasonForCancellation( "Death in the family" )
              .withAssessment( AssessmentAction.TC_APPROVE ) )
            .withTripAccommodation( new TripAccommodationBuilder()
              .withAccommodationCancelOnly( true )
              .withPropertyName( "Don Muang Hotel" )
              .withAddress( new AddressBuilder()
                .withAddressLine1( "Vibhavadi Rangsit Road" )
                .withCity( "Bangkok" )
                .withCountry( Country.TC_TH ) )
              .withStartDate( BaseDate.addDays(1) )
              .withEndDate( BaseDate.addDays(25) )
              .withCancellationFees( 120bd.ofDefaultCurrency() )
              .withAssessment( AssessmentAction.TC_APPROVE )
              .withReasonForCancellation( "Death in the family" ) )
            .create(bundle)

      var tripExposure = new ExposureBuilder()
          .onClaim(claim)
          .withExposureType( ExposureType.TC_TRIPCANCELLATIONDELAY )
          .withClaimant( policy.insured )
          .withClaimantType( ClaimantType.TC_INSURED )
          .withCoverage( policy.Coverages.firstWhere( \ p -> p.Type == CoverageType.TC_TRIP) )
          .withCoverageSubtypeAndRelatedFields( CoverageSubtype.TC_TRIPCANCELDELAY )
          .withIncident(tripIncident)
          .withClaimAssignment()
          .withState( ExposureState.TC_OPEN )
          .withClaimOrder( 1 )
          .create(bundle)

      var checkSet = new gw.api.databuilder.CheckSetBuilder()
        .withApprovalDate(BaseDate.addDays(-1))
        .withRequestingUser(findUserByUserName("eaustin"))
        .withApprovalStatus(TC_APPROVED)
        .onClaim(claim)
        .create(bundle)

      var reserveSet = new gw.api.databuilder.ReserveSetBuilder()
        .withApprovalDate(BaseDate.addDays(-1))
        .withRequestingUser(findUserByUserName("eaustin"))
        .withApprovalStatus(TC_APPROVED)
        .onClaim(claim)
        .create(bundle)

      var reserveLine = new gw.api.databuilder.ReserveLineBuilder()
        .withExposure( tripExposure )
        .withCostType(CostType.TC_CLAIMCOST)
        .withCostCategory(CostCategory.TC_TRIP_CANCEL_DELAY)
        .withClaim(claim)
        .create(bundle)
        
      new gw.api.databuilder.ReserveBuilder()
        .withReserveLine(reserveLine)
        .onClaim(claim)
        .onTransactionSet(reserveSet)
        .withCurrency(claim.Currency)
        .withStatus(TC_SUBMITTED)
        .withLineItem( 200bd.ofDefaultCurrency(), "Flight cancellation fees", LineCategory.TC_OTHER )
        .withLineItem( 120bd.ofDefaultCurrency(), "Hotel cancellation fees", LineCategory.TC_OTHER )
        .create(bundle)
      
      var check = new gw.api.databuilder.CheckBuilder()
        .onClaim(claim)
        .withIssueDate(BaseDate.addDays(-1))
        .withScheduledSendDate(BaseDate.addDays(-1))
        .withBankAccount(BankAccount.TC_DEFAULT)
        .onCheckSet(checkSet)
        .withPayTo("Jeffrey Lieberman")
        .withStatus(TransactionStatus.TC_ISSUED)
        .withPaymentMethod(PaymentMethod.TC_CHECK)
        .withCheckNumber("652421")
        .withPayee(new gw.api.databuilder.CheckPayeeBuilder()
          .withPayee(policy.insured)
          .withPayeeType(ContactRole.TC_CLAIMANT))
        .withType(CheckType.TC_PRIMARY)
        .create(bundle)

      new gw.api.databuilder.PaymentBuilder()
        .withReserveLine(reserveLine)
        .onClaim(claim)
        .onTransactionSet(checkSet)
        .withCurrency(claim.Currency)
        .withStatus(TransactionStatus.TC_SUBMITTED)
        .onCheck(check)
        .withPaymentType(PaymentType.TC_FINAL)
        .withLineItem( 200bd.ofDefaultCurrency(), "Flight cancellation fees", LineCategory.TC_OTHER )
        .withLineItem( 120bd.ofDefaultCurrency(), "Hotel cancellation fees", LineCategory.TC_OTHER )
        .create(bundle)
    }

    { // claim 765-10-132563, Frances Beale, modified hotel reservation
      var policy = getFrancesBealePolicyBuilder( BaseDate ).create(bundle)
      
      var claim = new ClaimBuilder()
        .withClaimNumber("765-10-132563")
        .withPolicy(policy)
        .withLossDate(BaseDate.addDays(-4))
        .withIncidentReport( false )
        .withReportedDate(BaseDate)
        .withFlagged(TC_NEVERFLAGGED)
        .withLossLocation(new AddressBuilder().withCity("Sydney").withCountry(Country.TC_AU))
        .withLossCause(LossCause.TC_CANCELLATION)
        .withReporter(policy.insured)
        .withClaimant(policy.insured)
        .withMainContactType( PersonRelationType.TC_SELF )
        .withReportedByType( PersonRelationType.TC_SELF )
        .withLossType(LossType.TC_TRAV)
        .withValidationLevel(ValidationLevel.TC_PAYMENT)
        .withCoverageInQuestion(false)
        .withAssignmentStatus( TC_ASSIGNED )
        .withAssignedGroup(findGroupByName("Western Travel Group"))
        .withAssignedUser(findUserByUserName("eaustin"))
        .withAssignmentDate( BaseDate.addDays(-1) )
        .withCurrency(gw.api.util.CurrencyUtil.getDefaultCurrency())
        .withDescription("Claimant rebooked hotel room.")
        .withState(ClaimState.TC_OPEN)
        .withLOBCode(LOBCode.TC_TRAVEL)
        .create(bundle)
      claim3Info = claim.ClaimInfo

      new TripIncidentBuilder()
            .onClaim(claim)
            .withTripRU(policy.RiskUnits.firstWhere( \ r -> r.Subtype == typekey.RiskUnit.TC_TRIPRU ) as TripRU)
            .withLossEstimate( 0bd.ofDefaultCurrency() )
            .withTripAccommodation( new TripAccommodationBuilder()
              .withAccommodationCancelOnly( false )
              .withPropertyName( "Park Hotel" )
              .withAddress( new AddressBuilder()
                .withCity( "Sydney" )
                .withCountry( Country.TC_AU ) )
              .withStartDate( BaseDate.addDays(-3) )
              .withEndDate( BaseDate.addDays(12) )
              .withCancellationFees( 150bd.ofDefaultCurrency() )
              .withAssessment( AssessmentAction.TC_DENY )
              .withReasonForDenial( "After conversations with hotel representatives it was determined that the claimant demanded a room upgrade. The hotel did not offer it so the claimant left for another hotel." )
              .withAddnlTripAccommodation( new AddnlTripAccommodationBuilder()
                .withPropertyName("Broadmoor Plaza")
                .withAddress( new AddressBuilder()
                  .withAddressLine1( "76 Kent St" )
                  .withCity( "Sydney" )
                  .withCountry( Country.TC_AU ) )
              .withStartDate( BaseDate.addDays(-3) )
              .withEndDate( BaseDate.addDays(12) )
              .withPaidAmount( 1670bd.ofDefaultCurrency() )
              .withAssessment( AssessmentAction.TC_DENY )
              .withReasonForDenial( "See denial reason for original accommodation" ) ) )
            .create(bundle)
    }

    new gw.api.databuilder.PolicyPeriodBuilder()
      .withPolicy(new gw.api.databuilder.PeriodPolicyBuilder().onClaimInfo(claim1Info))
      .withPolicy(new gw.api.databuilder.PeriodPolicyBuilder().onClaimInfo(claim2Info))
      .withPolicy(new gw.api.databuilder.PeriodPolicyBuilder().onClaimInfo(claim3Info))
      .withPolicyPeriodType(TC_POLICY)
      .withExpirationDate(BaseDate.addDays(14))
      .withPolicyNumber("33-514135")
      .withPublicId("demo_sample:80001")
      .withPolicyType(PolicyType.TC_TRAVEL_PER)
      .withEffectiveDate(BaseDate.addDays(-14))
      .create(bundle)

  }
  
  public static function getFrancesBealePolicyBuilder(baseDate : Date) : PolicyBuilder {
    var frances = new PersonBuilder()
            .withFirstName( "Frances" )
            .withLastName( "Beale" )
            .withPrimaryAddressSetEarly( new AddressBuilder()
              .withAddressLine1( "4881 Pallet Street" )
              .withCity( "New York" )
              .withState(State.TC_NY)
              .withPostalCode( "10013" )
              .withCountry( TC_US ))

    var stephen = new PersonBuilder()
            .withFirstName( "Stephen" )
            .withLastName( "Beale" )
            .withPrimaryAddressSetEarly( new AddressBuilder()
              .withAddressLine1( "4881 Pallet Street" )
              .withCity( "New York" )
              .withState(State.TC_NY)
              .withPostalCode( "10013" )
              .withCountry( TC_US ))

    var australia = new TripRUBuilder()
            .withRUNumber( 1 )
            .withGeographicalRegion( GeographicalRegion.TC_AUSTRALIA_NZ )
            .withTripDescription( "Australia" )
            .withStartDate( baseDate.addDays(-14) ) 
            .withEndDate( baseDate.addDays(14) )
    return new PolicyBuilder()
      .withExpirationDate(baseDate.addDays(14))
      .withOrigEffectiveDate(baseDate.addDays(-14))
      .withEffectiveDate(baseDate.addDays(-14))
      .withStatus(TC_INFORCE)
      .withVerified(true)
      .withCurrency(gw.api.util.CurrencyUtil.getDefaultCurrency())
      .withPolicyNumber("33-514135")
      .withPolicyType(PolicyType.TC_TRAVEL_PER)
      .withContactInRole( frances, ContactRole.TC_INSURED )
      .withContactInRole( stephen, ContactRole.TC_COVEREDPARTY)
      .withRiskUnit( australia )
      .withCoverage( new PolicyCoverageBuilder()
        .withType( CoverageType.TC_BAGGAGE )
        .withDeductible( 35bd.ofDefaultCurrency() )
        .withExposureLimit( 1500bd.ofDefaultCurrency() )
        .withIncidentLimit( 5000bd.ofDefaultCurrency() )
        .withCovTerm( new FinancialCovTermBuilder()
          .perPerson()
          .withModelRestriction(CovTermModelRest.TC_PIP_SERVICES)
          .withFinancialAmount( 100bd.ofDefaultCurrency() ))
        .withCovTerm( new FinancialCovTermBuilder()
          .withModelRestriction(CovTermModelRest.TC_EXP )
          .withFinancialAmount( 500bd.ofDefaultCurrency() )
          .perPerson() ) )
      .withCoverage( new PolicyCoverageBuilder()
        .withType( CoverageType.TC_HEALTH_TRAVEL)
        .withDeductible( 35bd.ofDefaultCurrency() )
        .withIncidentLimit( 5000000bd.ofDefaultCurrency() )
        .withCovTerm( new FinancialCovTermBuilder()
          .withModelRestriction( CovTermModelRest.TC_PIP_DEATH )
          .withFinancialAmount( 2500bd.ofDefaultCurrency() )
          .perPerson() )
        .withCovTerm( new FinancialCovTermBuilder()
          .withModelRestriction( CovTermModelRest.TC_PIP_DEATH )
          .withFinancialAmount( 75000bd.ofDefaultCurrency() )
          .perPerson() )
        .withCovTerm( new FinancialCovTermBuilder()
          .withModelRestriction( CovTermModelRest.TC_MED )
          .withFinancialAmount( 200bd.ofDefaultCurrency() )
          .perPerson() )
        .withCovTerm( new FinancialCovTermBuilder()
          .withModelRestriction( CovTermModelRest.TC_MED )
          .withFinancialAmount( 20bd.ofDefaultCurrency() ))
        .withCovTerm( new FinancialCovTermBuilder()
          .withUniqueModelRestriction()
          .withFinancialAmount( 150000bd.ofDefaultCurrency() ) ) )
      .withCoverage( new PolicyCoverageBuilder()
        .withType( CoverageType.TC_HIREDAUTO_TRAVEL)
        .withDeductible( 100bd.ofDefaultCurrency() )
        .withIncidentLimit( 1000000bd.ofDefaultCurrency() )
        .withCovTerm( new FinancialCovTermBuilder()
          .withUniqueModelRestriction()
          .withFinancialAmount( 75000bd.ofDefaultCurrency() ) ) )
      .withCoverage( new PolicyCoverageBuilder()
        .withType( CoverageType.TC_LIAB_TRAVEL)
        .withDeductible( 100bd.ofDefaultCurrency() )
        .withIncidentLimit( 2000000bd.ofDefaultCurrency() )
        .withCovTerm( new FinancialCovTermBuilder()
          .withUniqueModelRestriction(  )
          .withFinancialAmount( 25000bd.ofDefaultCurrency() )
          .perPerson() )
        .withCovTerm( new FinancialCovTermBuilder()
          .withModelRestriction( CovTermModelRest.TC_ACC )
          .withFinancialAmount( 25000bd.ofDefaultCurrency() )
          .perPerson() ) )
      .withCoverage( new PolicyCoverageBuilder()
        .withType( CoverageType.TC_TRIP )
        .withDeductible( 35bd.ofDefaultCurrency() )
        .withExposureLimit( 5000bd.ofDefaultCurrency() )
        .withIncidentLimit( 50000bd.ofDefaultCurrency() )
        .withCovTerm( new FinancialCovTermBuilder()
          .withUniqueModelRestriction(  )
          .withFinancialAmount( 5000bd.ofDefaultCurrency() ) )
        .withCovTerm( new FinancialCovTermBuilder()
          .withUniqueModelRestriction(  )
          .withFinancialAmount( 600bd.ofDefaultCurrency() ) )
        .withCovTerm( new FinancialCovTermBuilder()
          .withUniqueModelRestriction( )
          .withFinancialAmount( 5000bd.ofDefaultCurrency() )
          .perPerson() )
        .withCovTerm( new FinancialCovTermBuilder()
          .withUniqueModelRestriction()
          .withFinancialAmount( 5000bd.ofDefaultCurrency() )
          .perPerson() )
        .withCovTerm( new FinancialCovTermBuilder()
          .withUniqueModelRestriction(  )
          .withFinancialAmount( 200bd.ofDefaultCurrency() )
          .perPerson() ) ) 

  }

  public static function getJeffreyLiebermanPolicyBuilder(baseDate : Date) : PolicyBuilder {
    
    var jeffrey = new PersonBuilder()
            .withFirstName( "Jeffrey" )
            .withLastName( "Lieberman" )
            .withPrimaryAddressSetEarly( new AddressBuilder()
              .withAddressLine1( "1040 Hillcrest Lane" )
              .withCity( "Fullerton" )
              .withState(State.TC_CA)
              .withPostalCode( "93632" )
              .withCountry( TC_US ))
    
    var karen = new PersonBuilder()
            .withFirstName( "Karen" )
            .withLastName( "Lieberman" )
            .withPrimaryAddressSetEarly( new AddressBuilder()
              .withAddressLine1( "1040 Hillcrest Lane" )
              .withCity( "Fullerton" )
              .withState(State.TC_CA)
              .withPostalCode( "93632" )
              .withCountry( TC_US ))
    
    return new PolicyBuilder()
          .withExpirationDate(baseDate.addDays(30))
          .withOrigEffectiveDate(baseDate)
          .withEffectiveDate(baseDate)
          .withStatus(TC_INFORCE)
          .withVerified(true)
          .withCurrency(gw.api.util.CurrencyUtil.getDefaultCurrency())
          .withPolicyNumber("60-613881")
          .withPolicyType(PolicyType.TC_TRAVEL_PER)
          .withContactInRole( jeffrey, ContactRole.TC_INSURED)
          .withContactInRole( karen, ContactRole.TC_COVEREDPARTY)
          .withRiskUnit( new TripRUBuilder()
            .withRUNumber( 1 )
            .withGeographicalRegion( GeographicalRegion.TC_WORLDWIDE_EX_US_CA )
            .withTripDescription( "Asia" )
            .withStartDate( baseDate ) 
            .withEndDate( baseDate.addDays(30) ) )
          .withCoverage( new PolicyCoverageBuilder()
            .withType( CoverageType.TC_BAGGAGE )
            .withDeductible( 35bd.ofDefaultCurrency() )
            .withExposureLimit( 1500bd.ofDefaultCurrency() )
            .withIncidentLimit( 5000bd.ofDefaultCurrency() )
            .withCovTerm( new FinancialCovTermBuilder()
              .withModelRestriction( CovTermModelRest.TC_PIP_SERVICES )
              .withFinancialAmount( 100bd.ofDefaultCurrency() )
              .perPerson() )
            .withCovTerm( new FinancialCovTermBuilder()
              .withModelRestriction( CovTermModelRest.TC_PER )
              .withFinancialAmount( 500bd.ofDefaultCurrency() )
              .perPerson() ) )
          .withCoverage( new PolicyCoverageBuilder()
            .withType( CoverageType.TC_HEALTH_TRAVEL)
            .withDeductible( 35bd.ofDefaultCurrency() )
            .withIncidentLimit( 5000000bd.ofDefaultCurrency() )
            .withCovTerm( new FinancialCovTermBuilder()
              .withUniqueModelRestriction()
              .withFinancialAmount( 2500bd.ofDefaultCurrency() )
              .perPerson() )
            .withCovTerm( new FinancialCovTermBuilder()
              .withModelRestriction( CovTermModelRest.TC_PIP_DEATH )
              .withFinancialAmount( 75000bd.ofDefaultCurrency() )
              .perPerson() )
            .withCovTerm( new FinancialCovTermBuilder()
              .withModelRestriction( CovTermModelRest.TC_MED )
              .withFinancialAmount( 200bd.ofDefaultCurrency() )
              .perPerson() )
            .withCovTerm( new FinancialCovTermBuilder()
              .withModelRestriction( CovTermModelRest.TC_MED )
              .withFinancialAmount( 20bd.ofDefaultCurrency() ))
            .withCovTerm( new FinancialCovTermBuilder()
              .withUniqueModelRestriction(  )
              .withFinancialAmount( 150000bd.ofDefaultCurrency() ) ) )
          .withCoverage( new PolicyCoverageBuilder()
            .withType( CoverageType.TC_HIREDAUTO_TRAVEL)
            .withDeductible( 100bd.ofDefaultCurrency() )
            .withIncidentLimit( 1000000bd.ofDefaultCurrency() )
            .withCovTerm( new FinancialCovTermBuilder()
              .withUniqueModelRestriction()
              .withFinancialAmount( 75000bd.ofDefaultCurrency() ) ) )
          .withCoverage( new PolicyCoverageBuilder()
            .withType( CoverageType.TC_LIAB_TRAVEL)
            .withDeductible( 100bd.ofDefaultCurrency() )
            .withIncidentLimit( 2000000bd.ofDefaultCurrency() )
            .withCovTerm( new FinancialCovTermBuilder()
              .withUniqueModelRestriction()
              .withFinancialAmount( 25000bd.ofDefaultCurrency() )
              .perPerson() )
            .withCovTerm( new FinancialCovTermBuilder()
              .withModelRestriction( CovTermModelRest.TC_ACC )
              .withFinancialAmount( 25000bd.ofDefaultCurrency() )
              .perPerson() ) )
          .withCoverage( new PolicyCoverageBuilder()
            .withType( CoverageType.TC_TRIP )
            .withDeductible( 35bd.ofDefaultCurrency() )
            .withExposureLimit( 5000bd.ofDefaultCurrency() )
            .withIncidentLimit( 50000bd.ofDefaultCurrency() )
            .withCovTerm( new FinancialCovTermBuilder()
              .withUniqueModelRestriction( )
              .withFinancialAmount( 5000bd.ofDefaultCurrency() ))
            .withCovTerm( new FinancialCovTermBuilder()
              .withUniqueModelRestriction( )
              .withFinancialAmount( 600bd.ofDefaultCurrency() ))
            .withCovTerm( new FinancialCovTermBuilder()
              .withUniqueModelRestriction(  )
              .withFinancialAmount( 5000bd.ofDefaultCurrency() )
              .perPerson() )
            .withCovTerm( new FinancialCovTermBuilder()
              .withUniqueModelRestriction(  )
              .withFinancialAmount( 5000bd.ofDefaultCurrency() )
              .perPerson() )
            .withCovTerm( new FinancialCovTermBuilder()
              .withUniqueModelRestriction(  )
              .withFinancialAmount( 200bd.ofDefaultCurrency() )
              .perPerson() ) )
  }
}

