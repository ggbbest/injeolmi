pragma solidity ^0.5.6;

import "./klaytn-contracts/math/SafeMath.sol";
import "./interfaces/ICeikFMPool.sol";
import "./interfaces/ICeikFM.sol";

contract CeikFMPool is ICeikFMPool {
    using SafeMath for uint256;

    ICeikFM public cfm;

    constructor(ICeikFM _cfm) public {
        cfm = _cfm;
    }

    function () payable external {}

    function swapToCFM() external payable {
        uint256 newKlay = address(this).balance;
        uint256 lastCFM = cfm.balanceOf(address(this));

        uint256 newCFM = (newKlay.sub(msg.value)).mul(lastCFM).div(newKlay);

        cfm.transfer(msg.sender, lastCFM.sub(newCFM));

        emit SwapToCFM(msg.sender, msg.value);
    }

    function swapToKlay(uint256 amount) external {
        uint256 lastKlay = address(this).balance;
        uint256 lastCFM = cfm.balanceOf(address(this));

        uint256 newKlay = lastCFM.mul(lastKlay).div(lastCFM.add(amount.mul(9).div(10)));

        cfm.transferFrom(msg.sender, address(this), amount);
        msg.sender.transfer(lastKlay.sub(newKlay));

        emit SwapToKlay(msg.sender, amount);
    }

    function addLiquidity() external payable {
        uint256 lastKlay = (address(this).balance).sub(msg.value);
        uint256 lastCFM = cfm.balanceOf(address(this));

        uint256 inputCFM = lastCFM.mul(msg.value).div(lastKlay);
        if(cfm.excluded(msg.sender)) {
            cfm.transferFrom(msg.sender, address(this), inputCFM);
        } else {
            cfm.transferFrom(msg.sender, address(this), inputCFM.mul(10).div(9));
        }
    }
}
