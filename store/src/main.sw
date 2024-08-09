contract;

abi Store {

    #[storage(write)]
    fn set_value(value: u64) -> u64;

    #[storage(read)]
    fn get_value() -> u64;
}

storage {
    value: u64 = 0,
}

impl Store for Contract {
    #[storage(write)]
    fn set_value(value: u64) -> u64 {
        storage.value.write(value);
        value
    }

    #[storage(read)]
    fn get_value() -> u64 {
        storage.value.read()
    }   
}