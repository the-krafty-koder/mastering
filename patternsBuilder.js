/* Builder pattern
- Used to build a complex object step by step via an easy interface
- The main objective is to break down a complex constructor into multiple, 
  more readable, and more manageable steps.
- Try to create builder methods that can set multiple related parameters 
  at once.
- Deduce and implicitly set parameters based on the values received as 
  input by a setter method, and in general, try to encapsulate as much 
  parameter setting related logic into the setter methods so that the 
  consumer of the builder interface is free from doing so.
*/

class Boat {
  constructor(
    hasMotor,
    motorCount,
    motorBrand,
    motorModel,
    hasSails,
    sailsCount,
    sailsMaterial,
    sailsColor,
    hullColor,
    hasCabin
  ) {}
}

// invoking : not easily readable and maintainable
const myBoat = new Boat(
  true,
  2,
  "Best Motor Co. ",
  "OM123",
  true,
  1,
  "fabric",
  "white",
  "blue",
  false
);

// step 1: aggregate all arguments into a single object
const myBoat2 = new Boat({
  hasMotor: true,
  motorCount: 2,
  motorBrand: "Best Motor Co. ",
  motorModel: "OM123",
  hasSails: true,
  sailsCount: 1,
  sailsMaterial: "fabric",
  sailsColor: "white",
  hullColor: "blue",
  hasCabin: false,
});

// An improvement
class BoatBuilder {
  withMotors(count, brand, model) {
    this.hasMotor = true;
    this.motorCount = count;
    this.motorBrand = brand;
    this.motorModel = model;
    return this;
  }

  withSails(count, material, color) {
    this.hasSails = true;
    this.sailsCount = count;
    this.sailsMaterial = material;
    this.sailsColor = color;
    return this;
  }
  hullColor(color) {
    this.hullColor = color;
    return this;
  }
  withCabin() {
    this.hasCabin = true;
    return this;
  }

  build() {
    return new Boat({
      hasMotor: this.hasMotor,
      motorCount: this.motorCount,
      motorBrand: this.motorBrand,
      motorModel: this.motorModel,
      hasSails: this.hasSails,
      sailsCount: this.sailsCount,
      sailsMaterial: this.sailsMaterial,
      sailsColor: this.sailsColor,
      hullColor: this.hullColor,
      hasCabin: this.hasCabin,
    });
  }
}

// invoking
const myBoat3 = new BoatBuilder()
  .withMotors(2, "Best Motor Co. ", "OM123")
  .withSails(1, "fabric", "white")
  .withCabin()
  .hullColor("blue")
  .build();
