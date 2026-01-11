import { Button, Heading } from "../../../shared/design-components";
import { Text } from "../../../shared/design-components";

// Home page main component
export default function HomePage() {
  return (
    <div className="p-8 space-y-12 bg-primary">
      {/* Headings Section */}
      <section className="space-y-4">
        <Heading level="h1" variant="display">
          Display Heading (H1)
        </Heading>
        <Heading level="h2">Default Heading (H2)</Heading>
        <Heading level="h3" variant="subtle">
          Subtle Heading (H3)
        </Heading>
        <Heading level="h4">Heading with Hubot Sans (H4)</Heading>
      </section>

      {/* Text Section */}
      <section className="space-y-4">
        <Heading level="h2">Text Variants</Heading>

        <Text variant="lead">
          This is lead text - perfect for introductory paragraphs that need to
          stand out from regular body text.
        </Text>

        <Text variant="body">
          This is standard body text. It uses the default font size and color
          for optimal readability across the application.
        </Text>

        <Text variant="small" size="sm">
          This is small text, useful for captions, labels, or helper text.
        </Text>

        <Text variant="muted">
          This is muted text for less important information.
        </Text>

        <div className="space-y-2">
          <Text variant="error" weight="semibold">
            ❌ This is an error message
          </Text>

          <Text variant="success" weight="semibold">
            ✅ This is a success message
          </Text>

          <Text variant="warning" weight="semibold">
            ⚠️ This is a warning message
          </Text>

          <Text variant="info" weight="semibold">
            This is an info message
          </Text>
        </div>

        <Text truncate>
          This is a very long text that will be truncated with an ellipsis when
          it exceeds the container width. This is useful for single-line text
          that might overflow.
        </Text>

        <Text lineClamp={2}>
          This text will be clamped to 2 lines. Any content beyond that will be
          hidden with an ellipsis. This is perfect for card descriptions or
          preview text where you want to limit the vertical space used.
        </Text>
      </section>

      {/* Buttons Section */}
      <section className="space-y-6">
        <Heading level="h2">Button Variants</Heading>

        <div className="flex flex-wrap gap-4">
          <Button variant="filled">Primary Button</Button>

          <Button variant="outlined">Secondary Button</Button>
        </div>

        <Heading level="h3">Button Sizes</Heading>
        <div className="flex flex-wrap items-center gap-4">
          <Button size="small">Small</Button>

          <Button size="base">Medium (Default)</Button>

          <Button size="large">Large</Button>
        </div>

        <Heading level="h3">Button States</Heading>
        <div className="flex flex-wrap gap-4">
          <Button isLoading>Loading Button</Button>

          <Button disabled>Disabled Button</Button>
        </div>

        <Heading level="h3">Buttons with Icons</Heading>
        <div className="flex flex-wrap gap-4">
          <Button variant="filled" leftIcon={<span>←</span>}>
            Back
          </Button>

          <Button variant="outlined" rightIcon={<span>→</span>}>
            Next
          </Button>
        </div>

        <Heading level="h3">Full Width Button</Heading>
        <Button variant="outlined" fullWidth>
          Full Width Button
        </Button>
      </section>

      {/* Real-world Example */}
      <section className="space-y-4 p-6 bg-secondary rounded-lg">
        <Heading level="h2">Real-world Example: Card</Heading>

        <div className="space-y-3">
          <Heading level="h3">Welcome to Our Platform</Heading>

          <Text variant="lead">
            Get started with our powerful tools and features.
          </Text>

          <Text variant="body">
            Our platform provides everything you need to manage your projects
            efficiently. With intuitive design and powerful features, you'll be
            up and running in no time.
          </Text>

          <Text variant="muted" size="sm">
            Last updated: January 11, 2026
          </Text>

          <div className="flex gap-3 pt-4">
            <Button variant="filled">Get Started</Button>
            <Button variant="outlined">Learn More</Button>
          </div>
        </div>
      </section>
    </div>
  );
}
