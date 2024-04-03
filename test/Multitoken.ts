import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import { parseEther } from "ethers";
import hre, { upgrades } from "hardhat";
import { Multitoken } from "../typechain-types";

const NTF_PRICE = parseEther("0.01");

describe("Multitoken", function () {
  async function deployFixture() {
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await hre.ethers.getSigners();

    const MultitokenContract = await hre.ethers.getContractFactory(
      "Multitoken"
    );
    const multitoken = (await upgrades.deployProxy(
      MultitokenContract
    )) as unknown as Multitoken;
    const contractAddress = await multitoken.getAddress();

    return { multitoken, owner, otherAccount, contractAddress };
  }

  it("Should deploy Multitoken", async function () {
    const { multitoken, owner } = await loadFixture(deployFixture);
    expect(await multitoken.owner()).to.equal(owner.address);
  });

  it("Shoud mint a token", async function () {
    const { multitoken, owner } = await loadFixture(deployFixture);

    await multitoken.mint(1, 2, {
      value: NTF_PRICE * 2n,
    });

    expect(await multitoken.balanceOf(owner.address, 1)).to.equal(2);
  });
  it("Shoud NOT mint token invalid id", async function () {
    const { multitoken } = await loadFixture(deployFixture);

    await expect(
      multitoken.mint(3, 2, {
        value: NTF_PRICE * 2n,
      })
    ).to.be.revertedWith("Invalid id");
  });
  it("Shoud NOT mint token invalid price", async function () {
    const { multitoken } = await loadFixture(deployFixture);

    await expect(
      multitoken.mint(1, 2, {
        value: NTF_PRICE,
      })
    ).to.be.revertedWith("Invalid price");
  });
  it("Shoud NOT mint token invalid amount", async function () {
    const { multitoken } = await loadFixture(deployFixture);

    await expect(
      multitoken.mint(1, 0, {
        value: NTF_PRICE * 2n,
      })
    ).to.be.revertedWith("Invalid amount");
  });

  it("Shoud NOT mint token not enough supply", async function () {
    const { multitoken } = await loadFixture(deployFixture);

    await expect(
      multitoken.mint(1, 51, {
        value: NTF_PRICE * 51n,
      })
    ).to.be.revertedWith("Max supply reached");
  });

  it("Shoul return URI token", async function () {
    const { multitoken } = await loadFixture(deployFixture);

    expect(await multitoken.uri(1)).to.equal("https://myapi.com/token/1.json");
  });

  it("Should withdraw", async function () {
    const { multitoken, owner } = await loadFixture(deployFixture);

    await multitoken.mint(1, 2, {
      value: NTF_PRICE * 2n,
    });
    const ownerBalanceBefore = await hre.ethers.provider.getBalance(
      owner.address
    );

    await multitoken.withdraw();

    const ownerBalanceAfter = await hre.ethers.provider.getBalance(
      owner.address
    );

    expect(
      await hre.ethers.provider.getBalance(await multitoken.getAddress())
    ).to.equal(0);
    expect(ownerBalanceAfter).to.be.greaterThan(ownerBalanceBefore);
  });

  it("Should NOT withdraw not the owner", async function () {
    const { multitoken, otherAccount } = await loadFixture(deployFixture);

    await expect(
      multitoken.connect(otherAccount).withdraw()
    ).to.be.revertedWithCustomError(multitoken, "OwnableUnauthorizedAccount");
  });
});
