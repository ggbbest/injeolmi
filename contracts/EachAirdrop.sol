pragma solidity ^0.5.6;

import "./klaytn-contracts/ownership/Ownable.sol";
import "./klaytn-contracts/math/SafeMath.sol";
import "./interfaces/ICeikFM.sol";

contract EachAirdrop is Ownable {
    using SafeMath for uint256;

    ICeikFM public cfm;

    constructor(ICeikFM _cfm) public {
        cfm = _cfm;
    }

    function airdrop(address[] calldata to, uint256[] calldata amounts) payable external onlyOwner {
        uint256 len = to.length;
        for (uint256 i = 0; i < len; i = i.add(1)) {
            cfm.transfer(to[i], amounts[i]);
        }
    }
}
