"""
Predefined Scenario Templates for Historical Analysis
This replaces free-form questions with structured scenario selection
"""

SCENARIO_CATEGORIES = {
    "historical_impact": {
        "name": "Historical Impact Analysis",
        "description": "Explore how this artifact influenced major historical events and societal changes",
        "icon": "🏛️",
        "color": "blue",
        "prompt_template": """Analyze the historical impact of this artifact in Sri Lankan history.

Artifact Context:
{context}

Generate a comprehensive historical impact analysis covering exactly 3 distinct perspectives:
1. Political/Governance Impact - How this artifact relates to political structures and power dynamics
2. Social/Cultural Impact - Its influence on daily life, traditions, and social practices
3. Economic/Trade Impact - Its role in commerce, trade routes, and economic systems

For each perspective, provide detailed historical evidence and implications."""
    },
    
    "cultural_exchange": {
        "name": "Cultural Exchange Pathways",
        "description": "Investigate how this artifact reflects cultural interactions between civilizations",
        "icon": "🌏",
        "color": "green",
        "prompt_template": """Examine the cultural exchange and cross-cultural connections related to this artifact.

Artifact Context:
{context}

Generate a cultural exchange analysis with exactly 3 distinct pathways:
1. Regional Exchange - Interactions with neighboring South Asian cultures (India, Southeast Asia)
2. Maritime Trade Connections - Links through Indian Ocean trade networks
3. Colonial Period Interactions - Cultural amalgamation during European contact

For each pathway, provide specific evidence of cultural exchange and mutual influence."""
    },
    
    "ritual_significance": {
        "name": "Ritual & Religious Significance",
        "description": "Uncover the spiritual and ceremonial importance of this artifact",
        "icon": "🕉️",
        "color": "purple",
        "prompt_template": """Explore the ritual, religious, and ceremonial significance of this artifact.

Artifact Context:
{context}

Generate a ritual significance analysis with exactly 3 dimensions:
1. Buddhist Religious Context - Connections to Buddhist practices and beliefs
2. Hindu/Indigenous Traditions - Links to Hindu or pre-Buddhist indigenous rituals
3. Royal Ceremonial Usage - Role in court ceremonies and royal protocols

For each dimension, explain specific ritual practices and spiritual meanings."""
    },
    
    "craft_technology": {
        "name": "Craft & Technology Evolution",
        "description": "Examine the technical skills and innovations embedded in this artifact",
        "icon": "🔨",
        "color": "orange",
        "prompt_template": """Analyze the craftsmanship, technology, and material knowledge demonstrated by this artifact.

Artifact Context:
{context}

Generate a craft technology analysis with exactly 3 technical aspects:
1. Material Science - Raw materials, their sources, and material properties utilized
2. Manufacturing Techniques - Specific craft methods, tools, and technical processes employed
3. Artistic Innovation - Decorative techniques, design principles, and aesthetic innovations

For each aspect, provide technical details and evidence of skill development."""
    },
    
    "colonial_transformation": {
        "name": "Colonial Period Transformation",
        "description": "Analyze how colonial contact affected the artifact's use and meaning",
        "icon": "⚓",
        "color": "red",
        "prompt_template": """Examine how colonial contact (Portuguese, Dutch, British) affected this artifact and its cultural context.

Artifact Context:
{context}

Generate a colonial transformation analysis with exactly 3 phases:
1. Portuguese Period (1505-1658) - Initial European contact and early transformations
2. Dutch Period (1658-1796) - Commercial exploitation and cultural adaptations
3. British Period (1796-1948) - Administrative changes and museum/heritage categorization

For each phase, describe specific changes in usage, meaning, or preservation."""
    },
    
    "trade_networks": {
        "name": "Trade Routes & Commerce",
        "description": "Map the commercial networks and economic systems connected to this artifact",
        "icon": "🚢",
        "color": "teal",
        "prompt_template": """Investigate the trade networks, commercial systems, and economic importance of this artifact.

Artifact Context:
{context}

Generate a trade network analysis with exactly 3 commercial dimensions:
1. Local Economy - Role in local markets, village economies, and regional trade
2. Indian Ocean Trade - Connections to maritime commerce and merchant networks
3. Export/Luxury Market - Value as export commodity or luxury item in global trade

For each dimension, provide evidence of commercial activity and economic significance."""
    },
    
    "preservation_heritage": {
        "name": "Heritage & Preservation Journey",
        "description": "Trace how this artifact was preserved and its journey to museum status",
        "icon": "🏺",
        "color": "amber",
        "prompt_template": """Trace the preservation history and heritage journey of this artifact from creation to present.

Artifact Context:
{context}

Generate a heritage preservation analysis with exactly 3 chronological stages:
1. Original Context & Usage - Initial purpose and original cultural setting
2. Discovery & Collection - How it was found, documented, and collected
3. Modern Conservation - Current preservation efforts and museum presentation

For each stage, describe the changing relationship between artifact and society."""
    },
    
    "comparative_analysis": {
        "name": "Comparative Cultural Analysis",
        "description": "Compare this artifact with similar objects from other civilizations",
        "icon": "🔍",
        "color": "indigo",
        "prompt_template": """Perform a comparative analysis of this artifact with similar objects from other cultures.

Artifact Context:
{context}

Generate a comparative analysis with exactly 3 cultural comparisons:
1. South Asian Parallels - Similar artifacts from India, Southeast Asia
2. Contemporary Global Equivalents - Comparable objects from other civilizations of the same period
3. Unique Sri Lankan Features - Distinctive characteristics that make it uniquely Sri Lankan

For each comparison, highlight similarities, differences, and cultural uniqueness."""
    }
}

def get_scenario_list():
    """Return a simplified list of scenarios for frontend"""
    return [
        {
            "id": key,
            "name": value["name"],
            "description": value["description"],
            "icon": value["icon"],
            "color": value["color"]
        }
        for key, value in SCENARIO_CATEGORIES.items()
    ]

def get_scenario_prompt(scenario_id, context):
    """Get the full prompt for a specific scenario"""
    if scenario_id not in SCENARIO_CATEGORIES:
        raise ValueError(f"Unknown scenario: {scenario_id}")
    
    return SCENARIO_CATEGORIES[scenario_id]["prompt_template"].format(context=context)

def get_scenario_info(scenario_id):
    """Get information about a specific scenario"""
    if scenario_id not in SCENARIO_CATEGORIES:
        return None
    return SCENARIO_CATEGORIES[scenario_id]
