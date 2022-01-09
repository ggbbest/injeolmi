pragma solidity ^0.5.6;

interface ICeikFMPool {

    event SwapToCFM(address indexed user, uint256 amount);
    event SwapToKlay(address indexed user, uint256 amount);

    function swapToCFM() payable external;
    function swapToKlay(uint256 amount) external;
}
