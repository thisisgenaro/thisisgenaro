---
id: journal-glc-inc-0104-routing-en
translationKey: journal-glc-inc-0104-routing
translationStatus: draft
language: en
title: The Firewall Wasn’t Blocking It
date: 2026-09-18
summary: The firewall was accepting WMS traffic, but the session was still taking the failed MPLS path instead of the recovered IPsec route.
topics:
  - infrastructure-operations
  - incident-analysis
  - network-reliability
tags:
  - GLC
  - WMS
  - FortiGate
  - Firewall
  - Routing
  - IPsec
  - MPLS
organizationIds:
  - glc
incidentIds:
  - GLC-INC-0104
personIds: []
relatedEntries:
  - journal-glc-inc-0104-opening
draft: false
slug: the-firewall-wasnt-blocking-it
image: /images/journal/entry-2/firewall-wasnt-blocking-it.png
readingTime: 5
---
# The Firewall Wasn’t Blocking It

By the time we started narrowing the problem, one explanation was already becoming difficult to defend: this did not look like a general WMS outage.

From Santiago, users could not reach the application, but other GLC locations were still using the same centralized platform normally. The application server was responding in the datacenter, the database was processing transactions, and the monitoring available there showed no broad service failure.

That made the situation stranger. The service everybody in Santiago was waiting for was not actually down.

## First: Is the WMS itself the problem?

Restarting the WMS came up as an option.

It was a reasonable suggestion. The warehouse could not use the application, and restarting a service is sometimes an effective way to clear a transient condition quickly.

But the evidence did not justify it yet.

Other locations were still working normally. Restarting a centralized WMS would interrupt healthy users and could remove useful evidence before we understood what users in Santiago were actually experiencing.

There was already pressure to get the warehouse moving again, but at that point restarting the application would have been an action without a strong explanation behind it.

So we left it alone.

## Next: Could it be DNS?

From the Santiago warehouse, users could reach other datacenter services, so a stale or incorrect WMS address was a reasonable next possibility. If the warehouse was trying to reach the wrong destination, the symptoms could look very similar to what we were seeing.

Name resolution looked normal. The WMS hostname returned the expected address:

`10.20.40.25`

We tested the address directly anyway.

The result was exactly the same.

Removing DNS from the path did not change the timeout, so that hypothesis went away quickly. Whatever was happening existed after the client already knew where the WMS was.

## Then: Is the backup firewall policy missing something?

Attention moved toward the backup path itself.

General datacenter connectivity from Santiago had recovered over IPsec, but the WMS could still depend on a specific firewall policy that was not matching correctly after failover. That explanation fit the pattern reasonably well: most things worked, while one application did not.

We checked the relevant firewall policy and then inspected the actual session.

The firewall was accepting the traffic.

That ruled out the simplest version of the firewall hypothesis. Traffic from the Santiago warehouse was being sent toward the WMS, and the FortiGate was not denying it.

But the session showed something we were not expecting.

**The WMS traffic was not leaving through the IPsec tunnel.**

It was being sent toward the private MPLS network.

## The problem changes shape

That observation changed the investigation completely.

Until then, we had been asking why one application had failed after the network recovered. Now the question was different: if the backup path was active and other datacenter traffic from Santiago was already using it, why was this particular destination still being sent toward the failed primary network?

The firewall was allowing the connection. The WMS was healthy. DNS was returning the correct address. The backup tunnel was working.

And yet the packet was still taking the wrong way out.

At that point, there was one place I wanted to look next:

**the routing table.**
