import Carousel from "../../src/components/carousel/Carousel";

describe("Carousel.tsx", () => {
    it("render", () => {
        cy.mount(<Carousel delay={2000}>
            <div>
                <Carousel.BackButton aria-label={"previous slide"}>Back</Carousel.BackButton>
                <Carousel.NextButton aria-label={"next slide"}>Next</Carousel.NextButton>
                <Carousel.PlayButton aria-label={"carlo"}>Play</Carousel.PlayButton>
            </div>
            <Carousel.SlideWrapper>
                {["test", "test 2", "test 3"].map((text, i) => <Carousel.Slide key={i}>
                    <p>
                        {text}
                    </p>
                </Carousel.Slide>)}
            </Carousel.SlideWrapper>
        </Carousel>);
    });
});