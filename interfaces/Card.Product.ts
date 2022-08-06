
/**
 * @param defines the card product entity
 * @author  fabricio 
 * @version 1.0.0
 * @since   1.0.0
 * @returns {CardProduct}
 * @description The card products resource represents the behavior and functionality of one or more cards (either physical or virtual)
 * @url https://www.marqeta.com/docs/core-api/card-products
 */



interface TransactionControl {
  accepted_countries_token: string;
  always_require_pin: boolean; 
  always_require_icc: boolean; 
  allow_gpa_auth: boolean; 
  require_card_not_present_card_security_code: boolean;
  allow_mcc_group_authorization_controls: boolean;
  ignore_card_suspended_state: boolean;
  allow_chip_fallback: boolean;
  allow_first_pin_set_via_financial_transaction: boolean;
}


interface JustInTimeFunding{
  paymentcard_funding_source: {
    enabled: boolean;
    refunds_destination: string;
  }
  programgateway_funding_source: {
    enabled: boolean;
    funding_source_token: string;
    refunds_destination: string;
    always_fund: boolean;
  }
}

interface CardLifeCycle{ 
  activate_upon_issue: boolean;
  expiration_offset: {
    unit: string // specify if a value is provided, default years
    value: number
    min_offset: {
      unit: string // specify if a value is provided, default years
      value: number
    }
  }
}

interface Control {
[key: string]: {
    enabled: boolean;
    address_verification: {
      validate: boolean;
    }
  };
}

interface Controls{
  manual_entry: Control;
  wallet_provider_card_on_file: Control;
  in_app_provisioning: Control;
  web_push_provisioning: {
    wpp_apple_partner_id: string;
    wpp_apple_card_template_id: string;
    wpp_google_piaid: string;
  };
  force_yellow_path_for_card_product: boolean;
}


interface DigitalWalletTokenization {
  card_art_id: string;
  provisioning_controls: Controls
}

interface CardProductConfig {

  transaction_control: TransactionControl;
  // funding schema.
  just_in_time_funding: JustInTimeFunding;
  card_life_cycle: CardLifeCycle;
  // allows use for apple pay and google pay
  digital_wallet_tokenization: DigitalWalletTokenization;

}

interface CardProduct {
  active: boolean;
  config: CardProductConfig;
}

