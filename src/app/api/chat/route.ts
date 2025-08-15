import { NextRequest, NextResponse } from "next/server";
import { chatModel, vectorStore } from "@/lib/langchain-config";
import { ChatMessage, TravelRecommendation } from "@/types";
import { HumanMessage, AIMessage } from "@langchain/core/messages";

export async function POST(request: NextRequest) {
  try {
    const {
      message,
      history = [],
    }: { message: string; history: ChatMessage[] } = await request.json();

    if (!message?.trim()) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    // Convert chat history to LangChain format
    const langChainHistory = history.map((msg) =>
      msg.role === "user"
        ? new HumanMessage(msg.content)
        : new AIMessage(msg.content)
    );

    // Perform vector search for relevant travel information using Hugging Face embeddings
    let context = "";
    try {
      const relevantDocs = await vectorStore.similaritySearch(message, 5);
      context = relevantDocs.map((doc) => doc.pageContent).join("\n\n");
      console.log(
        `Found ${relevantDocs.length} relevant documents for: "${message}"`
      );
    } catch (vectorError) {
      console.error("Vector search failed:", vectorError);
      throw new Error(
        "Unable to retrieve travel information. Please try again."
      );
    }

    // Ensure we have relevant context
    if (!context.trim()) {
      throw new Error('No relevant travel information found for your query. Please try rephrasing your question.')
    }

    // Create system prompt for travel recommendations
    const systemPrompt = `You are a helpful travel assistant specializing in Bangkok, Thailand. 

Use ONLY the following verified information about Bangkok attractions:
${context}

Guidelines:
- Base ALL recommendations on the provided context only
- Provide personalized travel recommendations based on the user's interests
- Be conversational and friendly
- Focus on practical advice and insider tips
- Include specific details like ratings, price ranges, and locations when available
- Consider the user's preferences from the conversation history
- If the context doesn't contain information to answer the question, politely suggest related attractions that are available

Keep responses concise but informative (under 200 words).`;

    // Generate response using LangChain
    console.log("Sending request to OpenRouter...");
    const response = await chatModel.invoke([
      { role: "system", content: systemPrompt },
      ...langChainHistory,
      new HumanMessage(message),
    ]);
    console.log("Response received from OpenRouter");

    // Generate mock recommendations based on the response
    const recommendations = generateMockRecommendations(
      message,
      response.content as string
    );

    return NextResponse.json({
      message: response.content,
      recommendations: recommendations.length > 0 ? recommendations : undefined,
    });
  } catch (error) {
    console.error("Chat API error:", error);

    // Provide more specific error information
    let errorMessage = "Failed to process chat message";
    if (error instanceof Error) {
      console.error("Error details:", error.message);
      if (
        error.message.includes("401") ||
        error.message.includes("unauthorized")
      ) {
        errorMessage = "Invalid API key. Please check your OpenRouter API key.";
      } else if (
        error.message.includes("network") ||
        error.message.includes("fetch")
      ) {
        errorMessage = "Network error. Please check your internet connection.";
      } else if (error.message.includes("timeout")) {
        errorMessage = "Request timed out. Please try again.";
      }
    }

    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

function generateMockRecommendations(
  userMessage: string,
  aiResponse: string
): TravelRecommendation[] {
  const message = userMessage.toLowerCase();
  const response = aiResponse.toLowerCase();

  // Keywords that trigger specific recommendations
  const recommendations: TravelRecommendation[] = [];

  if (
    message.includes("temple") ||
    message.includes("culture") ||
    message.includes("religious") ||
    response.includes("temple")
  ) {
    recommendations.push({
      id: "temple-1",
      title: "Wat Pho (Temple of the Reclining Buddha)",
      description:
        "Famous temple housing the giant reclining Buddha statue and traditional massage school",
      category: "Temple",
      location: {
        lat: 13.7465,
        lng: 100.4927,
        address: "2 Sanamchai Road, Grand Palace Subdistrict, Bangkok",
      },
      rating: 4.7,
      priceRange: "low",
      tags: ["temple", "buddha", "massage", "culture"],
      personalizedReason:
        "Perfect for experiencing traditional Thai massage and Buddhist culture",
    });
  }

  if (
    message.includes("food") ||
    message.includes("eat") ||
    message.includes("market") ||
    response.includes("food")
  ) {
    recommendations.push({
      id: "market-1",
      title: "Chatuchak Weekend Market",
      description: "Massive weekend market with food, crafts, and unique finds",
      category: "Market",
      location: {
        lat: 13.7998,
        lng: 100.5502,
        address: "587/10 Kamphaeng Phet 2 Road, Chatuchak, Bangkok",
      },
      rating: 4.3,
      priceRange: "low",
      tags: ["shopping", "food", "local", "weekend"],
      personalizedReason:
        "Great for discovering authentic Thai crafts and street food",
    });
  }

  if (
    message.includes("night") ||
    message.includes("party") ||
    message.includes("bar") ||
    response.includes("nightlife")
  ) {
    recommendations.push({
      id: "nightlife-1",
      title: "Khao San Road",
      description:
        "Famous backpacker street with nightlife, street food, and shops",
      category: "Nightlife",
      location: {
        lat: 13.759,
        lng: 100.4977,
        address: "Khao San Road, Talat Yot, Phra Nakhon, Bangkok",
      },
      rating: 4.0,
      priceRange: "low",
      tags: ["nightlife", "street food", "backpacker", "shopping"],
      personalizedReason:
        "Great for experiencing Bangkok nightlife and street food culture",
    });
  }

  if (
    message.includes("history") ||
    message.includes("palace") ||
    message.includes("royal") ||
    response.includes("historic")
  ) {
    recommendations.push({
      id: "palace-1",
      title: "Grand Palace",
      description:
        "Historic royal palace complex and home to the Emerald Buddha",
      category: "Historic Site",
      location: {
        lat: 13.75,
        lng: 100.4915,
        address: "Na Phra Lan Road, Phra Borom Maha Ratchawang, Bangkok",
      },
      rating: 4.6,
      priceRange: "medium",
      tags: ["history", "architecture", "culture", "temple"],
      personalizedReason:
        "Perfect for your interest in Thai culture and royal history",
    });
  }

  return recommendations.slice(0, 3); // max 3 recommendations
}
